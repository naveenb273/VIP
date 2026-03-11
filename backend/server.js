import express from 'express';
import cors from 'cors';
import { ideasRouter }      from './routes/ideas.js';
import { reactionsRouter }  from './routes/reactions.js';
import { attachmentsRouter } from './routes/attachments.js';

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json({ limit: '20mb' }));   // large enough for base64 file uploads

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/ideas',       ideasRouter);
app.use('/api/reactions',   reactionsRouter);
app.use('/api/attachments', attachmentsRouter);

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`\n✅  VIP API  →  http://localhost:${PORT}/api`);
  console.log(`   DB file     →  ./data/db.json\n`);
});
