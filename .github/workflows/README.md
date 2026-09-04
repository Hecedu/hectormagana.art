# Netlify deployment workflow setup

`github-actions.yml` uses GitHub-hosted runners to build `Portfolio-Client` and
deploy its static `build` directory directly to Netlify. Docker, SSH, and a
self-hosted GitHub Actions runner are not involved.

Add these **repository or production-environment secrets**:

| Secret | Value |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | A Netlify personal access token with permission to deploy the site. |
| `NETLIFY_SITE_ID` | The Project ID, shown in Netlify under **Project configuration → General → Project details → Project information**. |

The workflow deploys only pushes to `main` (or manual runs). It uses
`Portfolio-Client/netlify.toml`, so client-side routes continue to redirect to
`index.html`.

If the `hectormagana.art` domain currently points at the old server, update its DNS
records in Netlify after the first successful deploy. The site also references an
API that is not present in this repository; moving the frontend to Netlify does not
migrate that API or its database.
