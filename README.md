# VIP — Volvo Group Idea Sharing Platform

Full-stack monorepo: **Angular 19 frontend** + **Node.js / Express backend** + **JSON file database**.

```
VIP/
├── backend/            ← Express REST API (Node.js, ESM)
│   ├── server.js       ← Entry point  →  http://localhost:3000
│   ├── data/
│   │   ├── db.json     ← Persistent JSON database (the "DB")
│   │   └── db.helper.js
│   └── routes/
│       ├── ideas.js        ← Full CRUD + comments / collaborators / notes / requests
│       ├── reactions.js    ← likes, favorites, shares
│       └── attachments.js  ← base64 file upload / delete
│
└── frontend/           ← Angular 19 SPA
    ├── proxy.conf.json ← Dev proxy: /api → http://localhost:3000
    └── src/app/
        ├── security/security.config.ts   ← MSAL Azure Entra factory functions
        ├── app.config.ts                 ← Angular providers incl. MSAL
        ├── app.routes.ts                 ← MsalGuard on protected routes
        ├── services/
        │   ├── auth.service.ts           ← Thin MSAL wrapper → AzureUser signal
        │   ├── idea.service.ts           ← All state via HTTP → Express
        │   └── theme.service.ts
        └── components/  (auth, home, idea-card, idea-detail, navbar, ...)
```

---

## Quick Start

### 1. Install dependencies

```bash
# From project root
npm run install:all
# Or manually:
cd backend  && npm install
cd frontend && npm install
```

### 2. Start the backend

```bash
cd backend
npm start          # node server.js  → http://localhost:3000/api
# or hot-reload:
npm run dev        # node --watch server.js
```

### 3. Start the frontend

```bash
cd frontend
npm start          # ng serve --proxy-config proxy.conf.json  → http://localhost:4200
```

Open **http://localhost:4200** — you will be redirected to the Microsoft login page.

---

## Azure Entra ID (MSAL) Setup

The Azure credentials are already wired in `frontend/src/app/security/security.config.ts`.

Make sure `http://localhost:4200` is listed as a **Single Page Application Redirect URI** in your Azure App Registration. If it is not:

1. Go to **Azure Portal → Azure Active Directory → App Registrations → your app**
2. Open **Authentication → Add a platform → Single-page application**
3. Set Redirect URI: `http://localhost:4200`
4. Enable **ID tokens** and **Access tokens** under **Implicit grant**

For production, add your production URL (`https://your-domain.com`) as an additional redirect URI.

---

## API Reference

| Method | Endpoint                                    | Description                          |
|--------|---------------------------------------------|--------------------------------------|
| GET    | /api/ideas                                  | List all ideas                       |
| GET    | /api/ideas/:id                              | Single idea                          |
| POST   | /api/ideas                                  | Create idea                          |
| PUT    | /api/ideas/:id                              | Edit idea (title/description/tags)   |
| DELETE | /api/ideas/:id                              | Delete idea                          |
| POST   | /api/ideas/:id/comments                     | Add comment                          |
| POST   | /api/ideas/:id/collaborators                | Add collaborator                     |
| DELETE | /api/ideas/:ideaId/collaborators/:collabId  | Remove collaborator                  |
| POST   | /api/ideas/:id/notes                        | Add collaboration note               |
| PATCH  | /api/ideas/:ideaId/notes/:noteId/pin        | Toggle pin on note                   |
| POST   | /api/ideas/:id/requests                     | Send collaboration request           |
| PATCH  | /api/ideas/:ideaId/requests/:reqId          | Accept / decline request             |
| GET    | /api/reactions                              | Get liked/favorited sets             |
| POST   | /api/reactions/like/:ideaId                 | Toggle like                          |
| POST   | /api/reactions/favorite/:ideaId             | Toggle favorite                      |
| POST   | /api/reactions/share/:ideaId                | Increment share count                |
| POST   | /api/attachments/:ideaId                    | Upload attachment (base64)           |
| DELETE | /api/attachments/:ideaId/:attachmentId      | Delete attachment                    |
| GET    | /api/health                                 | Health check                         |

---

## Database

All data lives in `backend/data/db.json`.  
Every API call reads from and writes to this file atomically.  
The file is human-readable — you can edit it directly to seed or reset data.

---

## Angular Version Note

Angular 19 is the latest stable release (Angular 21 does not exist yet).  
The project targets ES2022 and uses standalone components throughout.
