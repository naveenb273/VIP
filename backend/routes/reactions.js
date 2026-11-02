import { Router } from 'express';
import { readDb, writeDb } from '../data/db.helper.js';

export const reactionsRouter = Router();

const findIdea = (db, id) => db.ideas.find((idea) => idea.id === id);
const normalizeEmail = (value = '') => String(value).trim().toLowerCase();
const nowIso = () => new Date().toISOString();

const appendHistory = (idea, event) => {
  idea.audit.history = Array.isArray(idea.audit.history) ? idea.audit.history : [];
  idea.audit.history.push(event);
};

const touchAudit = (idea, actorEmail, actorObjectId, action, changedFields = []) => {
  const actor = normalizeEmail(actorEmail) || idea.audit.updatedBy || idea.audit.createdBy || idea.authorInformation.email;
  const at = nowIso();
  idea.audit.updatedBy = actor;
  if (actorObjectId) {
    idea.audit.updatedByObjectId = actorObjectId;
  }
  idea.audit.updatedDate = at;
  appendHistory(idea, {
    action,
    changedBy: actor,
    changedByObjectId: actorObjectId,
    changedAt: at,
    changedFields
  });
};

reactionsRouter.get('/', (_req, res) => {
  const db = readDb();
  const userEmail = normalizeEmail(_req.query?.userEmail || '');
  const likedIds = userEmail
    ? db.ideas.filter((idea) => (idea.engagement?.likedBy || []).includes(userEmail)).map((idea) => idea.id)
    : [];
  const favoritedIds = userEmail
    ? db.ideas.filter((idea) => (idea.engagement?.favoritedBy || []).includes(userEmail)).map((idea) => idea.id)
    : [];
  res.json({ likedIds, favoritedIds });
});

reactionsRouter.post('/like/:ideaId', (req, res) => {
  const userEmail = normalizeEmail(req.body?.userEmail);
  const userObjectId = req.body?.userObjectId;
  if (!userEmail) {
    return res.status(400).json({ error: 'userEmail required' });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  idea.engagement.likedBy = Array.isArray(idea.engagement.likedBy) ? idea.engagement.likedBy : [];
  const likeIdx = idea.engagement.likedBy.indexOf(userEmail);

  if (likeIdx === -1) {
    idea.engagement.likedBy.push(userEmail);
  } else {
    idea.engagement.likedBy.splice(likeIdx, 1);
  }

  idea.engagement.likes = idea.engagement.likedBy.length;
  touchAudit(
    idea,
    userEmail,
    userObjectId,
    likeIdx === -1 ? 'idea_liked' : 'idea_unliked',
    ['engagement.likedBy', 'engagement.likes']
  );
  writeDb(db);
  res.json({ liked: likeIdx === -1, likes: idea.engagement.likes, likedBy: idea.engagement.likedBy });
});

reactionsRouter.post('/favorite/:ideaId', (req, res) => {
  const userEmail = normalizeEmail(req.body?.userEmail);
  const userObjectId = req.body?.userObjectId;
  if (!userEmail) {
    return res.status(400).json({ error: 'userEmail required' });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  idea.engagement.favoritedBy = Array.isArray(idea.engagement.favoritedBy) ? idea.engagement.favoritedBy : [];
  const favIdx = idea.engagement.favoritedBy.indexOf(userEmail);
  const favorited = favIdx === -1;

  if (favIdx === -1) {
    idea.engagement.favoritedBy.push(userEmail);
  } else {
    idea.engagement.favoritedBy.splice(favIdx, 1);
  }

  touchAudit(
    idea,
    userEmail,
    userObjectId,
    favorited ? 'idea_favorited' : 'idea_unfavorited',
    ['engagement.favoritedBy']
  );

  writeDb(db);
  res.json({ favorited, favoritedBy: idea.engagement.favoritedBy });
});

reactionsRouter.post('/share/:ideaId', (req, res) => {
  const userEmail = normalizeEmail(req.body?.userEmail);
  const userObjectId = req.body?.userObjectId;
  if (!userEmail) {
    return res.status(400).json({ error: 'userEmail required' });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  idea.engagement.shares = Number(idea.engagement.shares || 0) + 1;
  idea.engagement.sharedBy = Array.isArray(idea.engagement.sharedBy) ? idea.engagement.sharedBy : [];
  idea.engagement.sharedBy.push({
    sharedBy: userEmail,
    sharedByObjectId: userObjectId,
    sharedAt: nowIso()
  });
  touchAudit(idea, userEmail, userObjectId, 'idea_shared', ['engagement.shares', 'engagement.sharedBy']);
  writeDb(db);
  res.json({ shares: idea.engagement.shares, sharedBy: idea.engagement.sharedBy });
});
