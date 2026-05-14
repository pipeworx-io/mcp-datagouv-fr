# mcp-datagouv-fr

France data.gouv.fr open-data catalogue

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_datasets` | Search datasets. |
| `dataset` | Single dataset by id or slug. |
| `resources` | Resources (downloadable files) for a dataset. |
| `search_organizations` | Search organizations. |
| `organization` | Single organization by id or slug. |
| `reuses_search` | Search reuses (apps/analyses built on datasets). |

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

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
