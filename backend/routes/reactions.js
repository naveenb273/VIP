import { Router } from 'express';
import { readDb, writeDb } from '../data/db.helper.js';

export const reactionsRouter = Router();

// GET /api/reactions  — used on initial load to restore liked/favorited sets
reactionsRouter.get('/', (_req, res) => {
  const db = readDb();
  res.json(db.reactions || { likedIds: [], favoritedIds: [] });
});

// POST /api/reactions/like/:ideaId  — toggle like
reactionsRouter.post('/like/:ideaId', (req, res) => {
  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  db.reactions = db.reactions || { likedIds: [], favoritedIds: [] };
  const idx    = db.reactions.likedIds.indexOf(req.params.ideaId);

  if (idx === -1) { db.reactions.likedIds.push(req.params.ideaId); idea.likes++; }
  else            { db.reactions.likedIds.splice(idx, 1);           idea.likes = Math.max(0, idea.likes - 1); }

  writeDb(db);
  res.json({ liked: idx === -1, likes: idea.likes });
});

// POST /api/reactions/favorite/:ideaId  — toggle favorite
reactionsRouter.post('/favorite/:ideaId', (req, res) => {
  const db  = readDb();
  db.reactions = db.reactions || { likedIds: [], favoritedIds: [] };
  const idx = db.reactions.favoritedIds.indexOf(req.params.ideaId);

  if (idx === -1) db.reactions.favoritedIds.push(req.params.ideaId);
  else            db.reactions.favoritedIds.splice(idx, 1);

  writeDb(db);
  res.json({ favorited: idx === -1 });
});

// POST /api/reactions/share/:ideaId  — increment share count
reactionsRouter.post('/share/:ideaId', (req, res) => {
  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  idea.shares++;
  writeDb(db);
  res.json({ shares: idea.shares });
});
