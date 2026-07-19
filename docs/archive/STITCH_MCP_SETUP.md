# Stitch MCP setup

This repo is configured for Stitch via the remote MCP server.

## Current local setup
- `STITCH_API_KEY` is available in `.env.local`
- `wrangler` is installed locally for Hermes checks
- VS Code MCP config is stored in `.vscode/mcp.json`

## Stitch endpoint
- `https://stitch.googleapis.com/mcp`

## Auth method used
- API key auth via `X-Goog-Api-Key`

## Notes
- `.vscode/mcp.json` is gitignored so the secret stays local.
- If your API key changes, update `.vscode/mcp.json` and `.env.local` together.
- If you prefer OAuth later, we can switch the config to the token-based flow from the Stitch docs.

## How to use in VS Code
1. Open the project in VS Code.
2. Make sure the MCP extension / MCP support is enabled.
3. Reload the window if needed.
4. Open MCP tools and select `stitch`.

## Quick verification
Run:

```bash
npm run stitch:check
```

If it shows `STITCH_API_KEY: OK` and `wrangler: OK`, local readiness is good.
