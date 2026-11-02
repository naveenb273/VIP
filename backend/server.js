import { config as loadEnvironment } from 'dotenv';
import express    from 'express';
import cors       from 'cors';
import path       from 'path';
import { fileURLToPath } from 'url';
import { ideasRouter }       from './routes/ideas.js';
import { reactionsRouter }   from './routes/reactions.js';
import { attachmentsRouter } from './routes/attachments.js';
import { adminRouter }       from './routes/admin.js';
import { chatRouter }        from './routes/chat.js';
import { usersRouter }       from './routes/users.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnvironment({ path: path.join(__dirname, '.env') });

const app       = express();
const PORT      = process.env.PORT || 3000;
// Treat as production unless explicitly running in development
const IS_PROD   = process.env.NODE_ENV !== 'development';

// ── Middleware ─────────────────────────────────────────────────────────────────
// In dev: allow Angular dev server (port 4200). In prod: same origin.
if (!IS_PROD) {
  app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
}
app.use(express.json({ limit: '20mb' }));   // large enough for base64 cover images

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/ideas',       ideasRouter);
app.use('/api/reactions',   reactionsRouter);
app.use('/api/attachments', attachmentsRouter);
app.use('/api/admin',       adminRouter);
app.use('/api/chat',        chatRouter);
app.use('/api/users',       usersRouter);

// ── Health ─────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', ts: new Date().toISOString() })
);

// ── Serve Angular SPA in production ───────────────────────────────────────────
// In production the CI pipeline copies frontend/dist/vip/browser → backend/public
if (IS_PROD) {
  const publicDir = path.join(__dirname, 'public');
  app.use(express.static(publicDir));
  // All non-API routes → Angular index.html (client-side routing)
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
    res.sendFile(path.join(publicDir, 'index.html'));
  });
} else {
  // Dev: Angular dev server handles non-API routes via proxy
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
}

app.listen(PORT, () => {
  console.log(`\n✅  VIP API  →  http://localhost:${PORT}/api`);
  if (IS_PROD) console.log(`   Serving Angular SPA from ./public\n`);
  else console.log(`   Dev mode — proxying Angular from http://localhost:4200\n`);
  console.log(`   DB file  →  ./data/db.json\n`);
});
