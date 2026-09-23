# Agent guide

This repository contains Héctor Magaña's portfolio client. Read [ARCHITECTURE.md](ARCHITECTURE.md) before changing a feature or its dependencies. The code and configuration in this checkout are the source of truth when older documentation differs.

## Start here

- Run `git status --short` before editing. Preserve existing modified, deleted, and untracked files unless the task explicitly concerns them; do not reset or overwrite another contributor's work.
- Work in `Portfolio-Client/` for the React app. The repository root is not the client package directory.
- Trace a change from its route in `src/App.tsx` through the relevant `src/Views/`, `src/Components/`, state, styles, and assets before editing.
- Keep changes focused. Follow the existing React, TypeScript, and CSS patterns, and add or update a focused test when behavior changes.

## Local commands

Run these from `Portfolio-Client/`:

```sh
npm ci --legacy-peer-deps
npm start
CI=true npm test -- --watch=false
npm run build
```

Use the test or build commands relevant to the change and report what ran and whether it passed. `npm start` serves the client at `http://localhost:3000`; it does not start an API. The GitHub Actions deployment uses Node 20, `npm ci --legacy-peer-deps`, and `npm run build` with `CI=false`.

## Collaboration and boundaries

- The current workflow builds and deploys the static client to Netlify. The ASP.NET API, database scripts, and Nginx configuration described by the root README and `docker-compose.yml` are not in this checkout. Do not assume those services are available locally or make up their behavior.
- Several client views call relative `/api/...` endpoints. Check the caller and its model before changing request or response assumptions; describe any verification that needs the external API.
- Treat `Portfolio-Client/.env` and deployment credentials as sensitive configuration. Do not copy their values into documentation, logs, or committed code.
- Update [ARCHITECTURE.md](ARCHITECTURE.md) when a change alters routes, ownership of state, API integration, asset loading, or deployment. Keep this guide focused on how to work together.
- In the handoff, summarize the change, the checks run, and any unverified dependency or known limitation. Call out unrelated pre-existing changes only when they affect the result.
