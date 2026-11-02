# VIP Angular + Express Workspace

Angular 19 frontend with Express backend and JSON-file data store.

## MCP Tools

| Tool | Purpose |
| ---- | ------- |
| Chrome DevTools MCP | Inspect and debug the running app in browser (typically http://localhost:4200) |
| GitHub MCP | Read repository files and documentation when code/search context is needed |
| VS Code Tasks | Run setup/auth tasks defined in workspace |

## Directory Structure

| Path | Purpose |
| ---- | ------- |
| frontend/src/app/components/ | Angular UI components (home, navbar, cards, modals, profile, etc.) |
| frontend/src/app/services/ | Angular services (auth, ideas, notifications, theme) |
| frontend/src/app/models/ | Shared frontend model contracts |
| backend/routes/ | Express API routes (/api/ideas, /api/reactions, /api/admin, /api/attachments) |
| backend/data/db.json | Application seed and runtime data |
| azurepipelines/ | Azure DevOps CI/CD pipeline definitions |
| .github/workflows/ | GitHub Actions workflows |

## Operating Procedures

- Keep frontend changes aligned with Angular standalone component patterns and Angular Router usage.
- Keep API contract changes compatible across frontend models/services and backend route handlers.
- Validate changed files with diagnostics; run targeted checks when modifying data schema or pipeline files.
- For deploy-related updates, prefer explicit approval gates for production deployment stages.

## Common Commands

| Goal | Command |
| ---- | ------- |
| Authenticate to Volvo npm feed | npm run authenticate |
| Install backend + frontend dependencies | npm run setup |
| Start backend API (port 3000) | npm run start:api |
| Start Angular UI (port 4200) | npm run start:ui |
| Start both API and UI (Windows helper) | npm start |
| Build frontend for production | npm run build |
| Build frontend (explicit target) | npm run build:frontend |
| Reinstall backend + frontend dependencies | npm run install:all |

Run API and UI in separate terminals for local development unless using npm start.

## Custom Agents

| Agent | When to use |
| ----- | ----------- |
| @Explore | Fast read-only codebase exploration and targeted file discovery |
| @prototyper | UI prototyping help when designing or restructuring interface layouts |
