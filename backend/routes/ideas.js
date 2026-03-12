import { Router } from 'express';
import { readDb, writeDb, uid, today } from '../data/db.helper.js';

export const ideasRouter = Router();

// GET /api/ideas
ideasRouter.get('/', (_req, res) => {
  res.json(readDb().ideas);
});

// GET /api/ideas/:id
ideasRouter.get('/:id', (req, res) => {
  const idea = readDb().ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  res.json(idea);
});

// POST /api/ideas
ideasRouter.post('/', (req, res) => {
  const { title, description, author, authorId, avatar, avatarColor, tags, coverImage, coverPosition } = req.body;
  if (!title?.trim() || !description?.trim() || !author || !authorId)
    return res.status(400).json({ error: 'title, description, author, authorId required' });

  const db   = readDb();
  const idea = {
    id: `idea-${uid()}`,
    title: title.trim(), description: description.trim(),
    author, authorId,
    avatar:      avatar      || author.slice(0, 2).toUpperCase(),
    avatarColor: avatarColor || '#6366f1',
    date: today(), tags: Array.isArray(tags) ? tags : [],
    coverImage: coverImage || '',
    coverPosition: coverPosition || '50% 50%',
    status: 'published',
    attachments: [], likes: 0, shares: 0, comments: [],
    collaborators: [{
      id: uid(), name: author,
      avatar: avatar || author.slice(0, 2).toUpperCase(),
      avatarColor: avatarColor || '#6366f1',
      role: 'Owner', email: '', joinedDate: today()
    }],
    collaborationNotes: [],
    collaborationRequests: []
  };

  db.ideas.unshift(idea);
  writeDb(db);
  res.status(201).json(idea);
});

// PUT /api/ideas/:id  (owner only — enforced on frontend via authorId check)
ideasRouter.put('/:id', (req, res) => {
  const db  = readDb();
  const idx = db.ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Idea not found' });

  const { title, description, tags, coverImage, coverPosition } = req.body;
  if (title?.trim())       db.ideas[idx].title       = title.trim();
  if (description?.trim()) db.ideas[idx].description = description.trim();
  if (Array.isArray(tags)) db.ideas[idx].tags        = tags;
  if (coverImage !== undefined) db.ideas[idx].coverImage = coverImage;
  if (coverPosition !== undefined) db.ideas[idx].coverPosition = coverPosition;

  writeDb(db);
  res.json(db.ideas[idx]);
});

// DELETE /api/ideas/:id
ideasRouter.delete('/:id', (req, res) => {
  const db     = readDb();
  const before = db.ideas.length;
  db.ideas     = db.ideas.filter(i => i.id !== req.params.id);
  if (db.ideas.length === before) return res.status(404).json({ error: 'Idea not found' });
  writeDb(db);
  res.json({ deleted: req.params.id });
});

// ── Comments ──────────────────────────────────────────────────────────────────

// POST /api/ideas/:id/comments
ideasRouter.post('/:id/comments', (req, res) => {
  const { text, author, avatar, avatarColor } = req.body;
  if (!text?.trim() || !author) return res.status(400).json({ error: 'text and author required' });

  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const comment = {
    id: uid(), author,
    avatar:      avatar      || 'U',
    avatarColor: avatarColor || '#6366f1',
    text: text.trim(), date: today()
  };
  idea.comments.push(comment);
  writeDb(db);
  res.status(201).json(comment);
});

// ── Collaborators ─────────────────────────────────────────────────────────────

// POST /api/ideas/:id/collaborators
ideasRouter.post('/:id/collaborators', (req, res) => {
  const { name, email, avatar, avatarColor, role } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'name required' });

  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const c = {
    id: uid(), name: name.trim(), email: email || '',
    avatar:      avatar      || name.slice(0, 2).toUpperCase(),
    avatarColor: avatarColor || '#6366f1',
    role: role || 'Contributor', joinedDate: today()
  };
  idea.collaborators.push(c);
  writeDb(db);
  res.status(201).json(c);
});

// DELETE /api/ideas/:ideaId/collaborators/:collabId
ideasRouter.delete('/:ideaId/collaborators/:collabId', (req, res) => {
  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  idea.collaborators = idea.collaborators.filter(c => c.id !== req.params.collabId);
  writeDb(db);
  res.json({ deleted: req.params.collabId });
});

// ── Collaboration Notes ───────────────────────────────────────────────────────

// POST /api/ideas/:id/notes
ideasRouter.post('/:id/notes', (req, res) => {
  const { text, author, avatar, avatarColor } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: 'text required' });

  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const note = {
    id: uid(), author: author || 'Unknown',
    avatar:      avatar      || 'U',
    avatarColor: avatarColor || '#6366f1',
    text: text.trim(), date: today(), pinned: false
  };
  idea.collaborationNotes.push(note);
  writeDb(db);
  res.status(201).json(note);
});

// PATCH /api/ideas/:ideaId/notes/:noteId/pin  — toggle pin
ideasRouter.patch('/:ideaId/notes/:noteId/pin', (req, res) => {
  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  const note = idea.collaborationNotes.find(n => n.id === req.params.noteId);
  if (!note) return res.status(404).json({ error: 'Note not found' });

  note.pinned = !note.pinned;
  writeDb(db);
  res.json(note);
});

// ── Collaboration Requests ────────────────────────────────────────────────────

// POST /api/ideas/:id/requests
ideasRouter.post('/:id/requests', (req, res) => {
  const { requesterId, requesterName, requesterAvatar, requesterAvatarColor, message } = req.body;
  if (!requesterId || !requesterName || !message?.trim())
    return res.status(400).json({ error: 'requesterId, requesterName, message required' });

  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  if (idea.collaborationRequests.some(r => r.requesterId === requesterId && r.status === 'pending'))
    return res.status(409).json({ error: 'Request already pending' });

  const request = {
    id: uid(), requesterId, requesterName,
    requesterAvatar:      requesterAvatar      || 'U',
    requesterAvatarColor: requesterAvatarColor || '#6366f1',
    message: message.trim(), date: today(), status: 'pending'
  };
  idea.collaborationRequests.push(request);
  writeDb(db);
  res.status(201).json(request);
});

// PATCH /api/ideas/:ideaId/requests/:reqId  — accept | decline
ideasRouter.patch('/:ideaId/requests/:reqId', (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'declined'].includes(status))
    return res.status(400).json({ error: "status must be 'accepted' or 'declined'" });

  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  const req_ = idea.collaborationRequests.find(r => r.id === req.params.reqId);
  if (!req_) return res.status(404).json({ error: 'Request not found' });

  req_.status = status;

  if (status === 'accepted' && !idea.collaborators.some(c => c.name === req_.requesterName)) {
    idea.collaborators.push({
      id: uid(), name: req_.requesterName,
      avatar:      req_.requesterAvatar,
      avatarColor: req_.requesterAvatarColor,
      role: 'Contributor', email: '', joinedDate: today()
    });
  }

  writeDb(db);
  res.json(req_);
});
