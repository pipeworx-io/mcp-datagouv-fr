interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * data.gouv.fr MCP — French open-data catalogue.
 *
 * Auth: none for read. Docs: https://www.data.gouv.fr/dataservices/api/
 */


const BASE = 'https://www.data.gouv.fr/api/1';
const UA = 'pipeworx-mcp-datagouv-fr/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'search_datasets',
    description: 'Search datasets.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        organization: { type: 'string', description: 'Org id or slug.' },
        tag: { type: 'string' },
        page: { type: 'number', description: '1-based (default 1).' },
        page_size: { type: 'number', description: '1-200 (default 20).' },
      },
    },
  },
  {
    name: 'dataset',
    description: 'Single dataset by id or slug.',
    inputSchema: {
      type: 'object',
      properties: { id_or_slug: { type: 'string' } },
      required: ['id_or_slug'],
    },
  },
  {
    name: 'resources',
    description: 'Resources (downloadable files) for a dataset.',
    inputSchema: {
      type: 'object',
      properties: { dataset_id_or_slug: { type: 'string' } },
      required: ['dataset_id_or_slug'],
    },
  },
  {
    name: 'search_organizations',
    description: 'Search organizations.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        page: { type: 'number' },
        page_size: { type: 'number' },
      },
    },
  },
  {
    name: 'organization',
    description: 'Single organization by id or slug.',
    inputSchema: {
      type: 'object',
      properties: { id_or_slug: { type: 'string' } },
      required: ['id_or_slug'],
    },
  },
  {
    name: 'reuses_search',
    description: 'Search reuses (apps/analyses built on datasets).',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        page: { type: 'number' },
        page_size: { type: 'number' },
      },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_datasets': {
      const params = baseSearchParams(args);
      if (args.organization) params.set('organization', String(args.organization));
      if (args.tag) params.set('tag', String(args.tag));
      return dgGet(`/datasets/?${params}`);
    }
    case 'dataset':
      return dgGet(`/datasets/${encodeURIComponent(reqStr(args, 'id_or_slug', '"<slug>"'))}/`);
    case 'resources':
      return dgGet(`/datasets/${encodeURIComponent(reqStr(args, 'dataset_id_or_slug', '"<slug>"'))}/resources/`);
    case 'search_organizations':
      return dgGet(`/organizations/?${baseSearchParams(args)}`);
    case 'organization':
      return dgGet(`/organizations/${encodeURIComponent(reqStr(args, 'id_or_slug', '"<slug>"'))}/`);
    case 'reuses_search':
      return dgGet(`/reuses/?${baseSearchParams(args)}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function baseSearchParams(args: Record<string, unknown>): URLSearchParams {
  const p = new URLSearchParams();
  if (args.query) p.set('q', String(args.query));
  p.set('page', String(Math.max(1, (args.page as number) ?? 1)));
  p.set('page_size', String(Math.min(200, Math.max(1, (args.page_size as number) ?? 20))));
  return p;
}

async function dgGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('data.gouv.fr: not found');
  if (!res.ok) throw new Error(`data.gouv.fr: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
