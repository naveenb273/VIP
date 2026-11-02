# VIP — Volvo Ideas Platform

**Angular 19 + Express REST API · Volvo Group Hackspace · VCDK Design System**

An internal idea-sharing and collaboration platform built on the Volvo Group Design System (VCDK), deployed via the Volvo Group Hackspace infrastructure.

---

## Prerequisites

- [Node.js 20+](https://nodejs.org/en/download)
- [Git](https://git-scm.com/)
- Volvo Group Azure DevOps access (for `@volvo` npm packages)
- [VS Code](https://code.visualstudio.com/)

---

## Getting started (local development)

### 1. Authenticate to the Volvo npm feed

```bash
npm run authenticate
```

Sign in with your Volvo Group account when prompted.

### 2. Install all dependencies

```bash
npm run setup
```

This installs both `backend/` and `frontend/` dependencies.

### 3. Start the app

Open **two terminals**:

**Terminal 1 — API (port 3000):**
```bash
npm run start:api
```

**Terminal 2 — Angular UI (port 4200):**
```bash
npm run start:ui
```

Then open [http://localhost:4200](http://localhost:4200).

> The Angular dev server proxies `/api/*` requests to the Express backend automatically via `frontend/proxy.conf.json`.

---

## Project structure

```
.
├── frontend/          # Angular 19 app (VCDK design system)
│   ├── src/
│   │   └── app/
│   │       ├── components/   # Navbar, idea cards, modals, profile…
│   │       ├── services/     # Auth, idea, notification services
│   │       └── pages/        # Route components
│   └── angular.json
├── backend/           # Express REST API (JSON file store)
│   ├── routes/        # /api/ideas, /api/reactions, /api/admin…
│   ├── data/db.json   # Seed data
│   └── server.js
├── azurepipelines/    # Azure DevOps CI/CD (build + deploy)
├── terraform/         # Azure App Service infrastructure
├── scripts/           # npm feed authentication
└── package.json       # Root scripts
```

---

## Admin access

Log in with `naveen.basavarajappa@volvo.com` to access the **Admin → Seed Data** module, which allows you to download, upload, and clear the application database.

---

## Azure Entra ID (MSAL) configuration

| Setting       | Value                                  |
|---------------|----------------------------------------|
| Client ID     | `18830eed-04f6-4959-9ec5-6465b53044f2` |
| Tenant ID     | `f530c72b-e2d4-46a4-b9de-e55f0b2131da` |
| Redirect URI  | `http://localhost:4200` (dev)          |
| Scopes        | `openid`, `profile`, `User.Read`       |

---

## Build & deploy

The CI pipeline in `azurepipelines/cicd.yaml` handles:
1. Installing dependencies
2. Building the Angular app (`ng build --configuration production`)
3. Packaging Angular output + Express backend into a single zip
4. Deploying to Azure App Service

The Express backend serves the Angular SPA in production (`NODE_ENV=production`).
