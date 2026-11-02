import { Router }    from 'express';
import { readDb, writeDb } from '../data/db.helper.js';
import path          from 'path';
import { fileURLToPath } from 'url';
import fs            from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH   = path.join(__dirname, '../data/db.json');

export const adminRouter = Router();

const isCanonicalIdea = (idea) => {
  if (!idea?.id || !idea?.ideaInformation || !idea?.authorInformation || !idea?.collaboratorInformation || !idea?.engagement || !idea?.content || !idea?.audit) {
    return false;
  }

  const hasCoreEngagement = Number.isInteger(idea.engagement.likes)
    && Number.isInteger(idea.engagement.shares)
    && Array.isArray(idea.engagement.likedBy);

  const hasFutureEngagement = Array.isArray(idea.engagement.favoritedBy || [])
    && Array.isArray(idea.engagement.sharedBy || []);

  const hasCoreContent = Array.isArray(idea.content.attachments)
    && Array.isArray(idea.content.comments)
    && Array.isArray(idea.content.collaborationNotes)
    && Array.isArray(idea.content.collaborationRequests);

  const hasCoreAudit = typeof idea.audit.createdBy === 'string'
    && typeof idea.audit.createdDate === 'string'
    && typeof idea.audit.updatedBy === 'string'
    && typeof idea.audit.updatedDate === 'string';

  const hasFutureAudit = Array.isArray(idea.audit.history || []);

  return hasCoreEngagement && hasFutureEngagement && hasCoreContent && hasCoreAudit && hasFutureAudit;
};

// ── GET /api/admin/seed  — download full db.json ─────────────────────────────
adminRouter.get('/seed', (_req, res) => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="db.json"');
    res.send(raw);
  } catch (e) {
    res.status(500).json({ error: 'Could not read database' });
  }
});

// ── POST /api/admin/seed  — upload / replace db.json ─────────────────────────
adminRouter.post('/seed', (req, res) => {
  try {
    const data = req.body;
    // Canonical-schema validation
    if (!data || typeof data !== 'object' || !Array.isArray(data.ideas)) {
      return res.status(400).json({ error: 'Invalid db.json — must have an "ideas" array' });
    }
    const isCanonical = data.ideas.every((idea) => isCanonicalIdea(idea));
    if (!isCanonical) {
      return res.status(400).json({ error: 'Invalid db.json — ideas must follow canonical nested schema' });
    }

    // Roles are managed through the Admin Access screen and must survive seed imports.
    const currentUsers = readDb().users ?? [];
    writeDb({ ...data, users: currentUsers });
    res.json({ ok: true, ideas: data.ideas.length, message: 'Database replaced successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Could not write database' });
  }
});

// ── DELETE /api/admin/seed  — clear all ideas (keep schema) ──────────────────
adminRouter.delete('/seed', (_req, res) => {
  try {
    const db = readDb();
    const { reactions: _legacyReactions, ...rest } = db;
    const cleared = { ...rest, ideas: [] };
    writeDb(cleared);
    res.json({ ok: true, message: 'All seed data cleared' });
  } catch (e) {
    res.status(500).json({ error: 'Could not clear database' });
  }
});
