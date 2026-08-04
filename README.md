# @pipeworx/datagouv-fr

[data.gouv.fr](https://www.data.gouv.fr) MCP — French national open-data catalogue. Keyless for read.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `search_datasets(query?, organization?, tag?, page?, page_size?)` — dataset search
- `dataset(id_or_slug)` — single dataset record
- `resources(dataset_id_or_slug)` — list of downloadable resources for a dataset
- `search_organizations(query?, page?, page_size?)` — org search
- `organization(id_or_slug)` — single organization
- `reuses_search(query?, page?, page_size?)` — search "reuses" (apps/analyses built on datasets)

## Data source

`https://www.data.gouv.fr/api/1/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "datagouv-fr": {
      "url": "https://gateway.pipeworx.io/datagouv-fr/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Datagouv Fr data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
