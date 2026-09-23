# Portfolio architecture

This document describes the code in this checkout. See [AGENTS.md](AGENTS.md) for the working conventions. The root `README.md` and `docker-compose.yml` describe an earlier full-stack deployment, but the backend, database scripts, and Nginx configuration are absent here. The application available to build from this repository is the React client in `Portfolio-Client/`.

## Client structure and request flow

`Portfolio-Client/` is a Create React App project using React 18, TypeScript, React Router 6, Redux Toolkit, Axios, and Bootstrap. `src/index.tsx` mounts the Redux provider and browser router. `src/App.tsx` owns the route tree:

| Route | View | Layout |
| --- | --- | --- |
| `/` | `Views/Home.tsx` | Portfolio |
| `/login` | `Views/Login.tsx` | Portfolio |
| `/profile` | `Views/Profile.tsx` | Portfolio |
| `/game` | `Views/Game.tsx` | Portfolio |
| `/moodboard` | `Views/BlogPosts.tsx` | Portfolio |
| `/terminal` | `Views/The_Terminal/Terminal_Home.tsx` | Terminal |

The two layout components in `src/Components/UI/` supply their own navigation and an `<Outlet />`; the portfolio layout also renders a footer and selects a background gradient. `src/Views/` composes page content. Reusable portfolio cards and project presentations live in `src/Components/Portfolio/`; authentication and profile controls live under `src/Components/Auth/` and `src/Components/UserData/`. The home page renders `AsciiBanner` above its directly composed project cards. The former presentation card and its optional profile picture are no longer loaded. `src/Components/Portfolio/Cards/ProjectsCard.tsx` is a separate API-backed project carousel, not the home page's current project list.

Global CSS is in `src/index.css` and `src/App.css`. Components also use Bootstrap classes, some local CSS, and shared class strings in `src/Styles/LayoutStyles.ts`. Images and fonts imported by components live in `src/Assets/` and `src/Fonts/`; files served by URL live in `public/`.

## State and external integrations

`src/Store/index.ts` configures the Redux store. Its `auth` slice in `src/Store/auth-slice.ts` holds the identity token, API bearer token, and optional user profile. The slice calls `src/Services/auth-service.ts` to exchange an identity token and invalidate a bearer token. Other view and component state stays local to React components.

Axios calls use relative `/api/...` paths. The client references authentication, comments, user data, image upload, and project-post endpoints. The request and data shapes are represented by their callers and `src/Models/`; there is no API implementation or schema in this repository. `Portfolio-Client/package.json` has a development `proxy` setting, but that setting does not supply an API. Features that depend on `/api` need a separately available service to be verified end to end.

The login and logout button components currently return empty containers, so the repository does not provide a working visible sign-in control. The login and profile pages and Redux auth flow should not be read as proof that sign-in is functional. User profile pictures are rendered from an external S3 URL.

The `/game` view uses `react-unity-webgl` to load the Cheat Squad build from `public/Build/` via `PUBLIC_URL`. Keep the loader, data, framework, and WebAssembly files together when updating that build.

## Build and deployment

`Portfolio-Client/package.json` defines `start`, `test`, and `build` scripts through `react-scripts`. The production output is `Portfolio-Client/build/`. `.github/workflows/github-actions.yml` builds the client on Node 20 after `npm ci --legacy-peer-deps` and deploys that output to Netlify on pushes to `main` or manual workflow runs. `Portfolio-Client/netlify.toml` rewrites client-side routes to `index.html`. Deployment setup and required secrets are documented in `.github/workflows/README.md`.

The checked-in `docker-compose.yml` and `Portfolio-Client/dockerfile` are historical deployment artifacts, not the current GitHub Actions deployment path. The Netlify rewrite handles browser routes; it does not define a route or deployment for `/api`.
