# VIP — Volvo Ideas Platform

**Angular 19 + Express REST API · Volvo Group Design System (VCDK)**

An internal idea-sharing and collaboration platform built on the Volvo Group Design System, featuring a modern Angular 19 frontend, Express.js backend, and integrated AI capabilities.

---

## Local development prerequisites

- **Node.js 20+** ([Download](https://nodejs.org/))
- **npm 11+** or later
- **Git** for version control
- **Terraform 1.7.x** (optional, for infrastructure validation)
- **Volvo Group Azure DevOps access** (for `@volvo` npm packages)
- **VS Code** (recommended editor)

---

## Architecture Overview

### Frontend (Angular 19)
- **Framework:** Angular 19 with TypeScript
- **UI Library:** Volvo Group Design System (VCDK/VGDS)
- **Styling:** TailwindCSS 4.3.0 + VCDK design tokens
- **State Management:** RxJS signals and computed state
- **Authentication:** Microsoft Entra ID (MSAL)
- **Development Server:** Port 4200
- **Build Tool:** Angular CLI with webpack

### Backend (Express.js)
- **Framework:** Express.js server
- **Data Store:** JSON file-based database (`backend/data/db.json`)
- **API Port:** 3000
- **Routes:** `/api/ideas`, `/api/reactions`, `/api/users`, `/api/admin`, `/api/attachments`, `/api/chat`
- **Services:** Gen AI client integration, idea retrieval, user management

### Microfrontends
- **Agentic Chatbot** — Standalone Angular MFE for AI chat integration
- Mounted alongside main application via shared module federation

---

## Key Features

- **Idea Management** — Create, edit, share, and collaborate on ideas
- **Real-time Reactions** — Like and comment on ideas
- **Admin Dashboard** — Seed data management (upload/download/clear database)
- **Gen AI Integration** — AI-powered chat and suggestion capabilities
- **User Profiles** — Team collaboration and visibility
- **File Attachments** — Support for document uploads with ideas
- **Responsive Design** — Mobile-friendly VCDK components
- **Role-based Access** — Admin functions for seed data management

---

## Getting Started

### 1. Authenticate to the Volvo npm feed

```bash
npm run authenticate
```

Sign in with your Volvo Group account when prompted.

### 2. Install dependencies

```bash
npm run setup
```

This installs dependencies for both `frontend/` and `backend/` folders.

### 3. Start the application

Open **two separate terminals**:

**Terminal 1 — Express API (port 3000):**
```bash
npm run start:api
```

**Terminal 2 — Angular UI (port 4200):**
```bash
npm run start:ui
```

Or use the convenience script on Windows:
```bash
npm start
```

Then navigate to [http://localhost:4200](http://localhost:4200).

> The Angular dev server proxies `/api/*` requests to the Express backend via `frontend/proxy.conf.json`.

---

## Project Structure

```
.
├── frontend/                        # Angular 19 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # UI components (home, navbar, cards, modals, profile, etc.)
│   │   │   ├── services/           # Business logic (auth, ideas, notifications, theme)
│   │   │   ├── models/             # TypeScript interfaces and types
│   │   │   ├── guards/             # Route guards
│   │   │   ├── app.routes.ts       # Angular Router configuration
│   │   │   └── app.config.ts       # Application configuration
│   │   ├── styles.scss             # Global styles
│   │   └── index.html
│   ├── angular.json                # Angular build configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── proxy.conf.json             # Dev server proxy settings
│
├── backend/                         # Express.js API
│   ├── routes/
│   │   ├── ideas.js                # Idea CRUD endpoints
│   │   ├── reactions.js            # Like/comment endpoints
│   │   ├── users.js                # User management
│   │   ├── admin.js                # Admin seed data endpoints
│   │   ├── attachments.js          # File upload handling
│   │   └── chat.js                 # AI chat integration
│   ├── services/
│   │   ├── gen-ai-client.js        # Gen AI Hub client
│   │   └── idea-retriever.js       # Idea search/filter logic
│   ├── data/
│   │   ├── db.json                 # Application database
│   │   └── db.helper.js            # Database utilities
│   ├── server.js                   # Express server entry point
│   └── package.json
│
├── microfrontends/
│   └── agentic-chatbot/            # Standalone MFE for AI chat
│       ├── src/
│       ├── angular.json
│       └── package.json
│
├── terraform/                       # Infrastructure as Code
│   ├── main.tf                     # Terraform configuration
│   ├── variables.tf
│   ├── outputs.tf
│   ├── providers.tf
│   └── modules/
│       └── hackspace-base/         # Reusable infrastructure module
│
├── azurepipelines/                 # Azure DevOps CI/CD
│   ├── cicd.yaml                   # Main pipeline definition
│   └── migration-variables.yaml    # Migration configuration
│
├── scripts/
│   ├── authenticate.mjs            # Volvo npm feed authentication
│   └── start-api.mjs               # API startup script
│
├── shared/                          # Shared templates and utilities
│   ├── backstage/                  # Backstage scaffolder templates
│   ├── cicd/                       # Reusable CI/CD templates
│   └── terraform/                  # Shared Terraform modules
│
├── techDocs/                        # Documentation (this folder)
├── README.md                        # Root documentation
└── package.json                     # Root package configuration
```

---

## Common npm Commands

| Command | Purpose |
|---------|----------|
| `npm run authenticate` | Authenticate to the Volvo Azure DevOps npm feed |
| `npm run setup` | Install backend + frontend dependencies |
| `npm run start:api` | Start Express backend (port 3000) |
| `npm run start:ui` | Start Angular dev server (port 4200) |
| `npm start` | Start both API and UI (Windows only) |
| `npm run build` | Build Angular frontend for production |
| `npm run build:frontend` | Explicit build of frontend |
| `npm run install:all` | Reinstall all dependencies |

---

## Authentication & Authorization

### Microsoft Entra ID (MSAL)

| Setting | Value |
|---------|-------|
| **Client ID** | `18830eed-04f6-4959-9ec5-6465b53044f2` |
| **Tenant ID** | `f530c72b-e2d4-46a4-b9de-e55f0b2131da` |
| **Redirect URI** | `http://localhost:4200` (development) |
| **Scopes** | `openid`, `profile`, `User.Read` |

### Admin Access

Log in with your **Volvo Group admin account** (e.g., `naveen.basavarajappa@volvo.com`) to access:
- **Admin → Seed Data** module for database management
- Download, upload, and clear application database

---

## Infrastructure & Deployment

### Azure Resources (Terraform Provisioned)

- **App Service** — Hosts the Angular frontend and Express API
- **Application Insights** — Application monitoring and diagnostics
- **Log Analytics Workspace** — Centralized logging
- **Microsoft Entra ID** — Authentication and authorization
- **VNet Integration** — Secure outbound networking
- **Key Vault** — Secret and configuration management (optional)

### CI/CD Pipeline (`azurepipelines/cicd.yaml`)

**Continuous Integration (CI):**
1. Authenticate to Volvo npm feed
2. Install dependencies
3. Build Angular frontend (`ng build --configuration production`)
4. Run linting and tests
5. Validate Terraform configuration
6. Publish build artifact

**Continuous Deployment (CD):**
1. Runs on `main` branch only
2. Applies Terraform infrastructure
3. Deploys to Azure App Service
4. Validates deployment health

---

## Team Access Management

As a hackspace owner, you can manage team access through Azure IAM:

1. Navigate to your **Azure Resource Group** in the Azure portal
2. Select **Access control (IAM)** from the left menu
3. Click **+ Add** → **Add role assignment**
4. Choose role:
   - **Contributor** — Create and manage resources
   - **Reader** — View resources only
5. Select team members by email and complete assignment

---

## Development Workflow

### Making Frontend Changes

1. Create or modify components in `frontend/src/app/components/`
2. Create or update services in `frontend/src/app/services/`
3. Keep models synchronized with `frontend/src/app/models/`
4. Use VCDK components for UI consistency
5. Test in dev server at `http://localhost:4200`

### Making Backend Changes

1. Create or modify routes in `backend/routes/`
2. Update data models in `backend/data/db.json`
3. Add services in `backend/services/` for business logic
4. Test API endpoints at `http://localhost:3000/api/*`

### API Contract Updates

- Ensure frontend API calls align with backend route definitions
- Keep data types consistent between frontend models and backend responses
- Update proxy configuration if API paths change

---

## Troubleshooting

**Port conflicts:**
```bash
# List processes on port 4200 or 3000
netstat -ano | findstr :4200
# Kill process by PID (Windows)
taskkill /PID <PID> /F
```

**npm feed authentication errors:**
```bash
npm run authenticate
npm cache clean --force
npm run setup
```

**Proxy issues:**
- Verify `frontend/proxy.conf.json` points to `http://localhost:3000`
- Ensure backend server is running before starting Angular dev server

---

## Additional Resources

- [Angular 19 Documentation](https://angular.io/)
- [VCDK/VGDS Design System](https://design.volvoetech.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Terraform Documentation](https://www.terraform.io/docs/)
- [Microsoft Entra ID (MSAL)](https://learn.microsoft.com/en-us/azure/active-directory/develop/)
- [Azure DevOps Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/)