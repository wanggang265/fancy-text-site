# Precision PDF Stitch Workflow

This project includes a local Stitch prompt helper for the Precision PDF homepage and workspace.

## 1) Set the API key
Create or edit `.env.local` in the project root:

```bash
STITCH_API_KEY=***
```

## 2) Check local readiness

```bash
npm run stitch:check
```

This checks:
- `STITCH_API_KEY`
- `wrangler`
- basic local commands

## 3) Generate a Stitch prompt

Homepage prompt:

```bash
npm run stitch:prompt
```

Tool page prompt:

```bash
npm run stitch:prompt -- --tool
```

## 4) Paste into Stitch
Copy the output and paste it into Stitch to generate the next design concept.

## Notes
- `.env.local` is ignored by git.
- This helper is aligned to the current Precision PDF site structure.
- If a true Stitch API call becomes necessary later, extend the helper once the endpoint/spec is known.
