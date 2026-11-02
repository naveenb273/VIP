import { Router } from 'express';
import { readDb, writeDb, uid } from '../data/db.helper.js';

export const ideasRouter = Router();

const nowIso = () => new Date().toISOString();
const normalizeEmail = (value = '') => String(value).trim().toLowerCase();

const findIdea = (db, id) => db.ideas.find((idea) => idea.id === id);

const appendHistory = (idea, event) => {
  idea.audit.history = Array.isArray(idea.audit.history) ? idea.audit.history : [];
  idea.audit.history.push(event);
};

const touchAudit = (idea, actorEmail, actorObjectId, action = 'updated', changedFields = [], note) => {
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
    changedFields,
    note
  });
};

ideasRouter.get('/', (_req, res) => {
  const db = readDb();
  res.json(db.ideas);
});

ideasRouter.get('/:id', (req, res) => {
  const idea = findIdea(readDb(), req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  res.json(idea);
});

ideasRouter.post('/', (req, res) => {
  const {
    title,
    description,
    author,
    authorEmail,
    authorObjectId,
    avatar,
    avatarColor,
    tags,
    coverImage,
    coverPosition
  } = req.body;
  const ownerEmail = normalizeEmail(authorEmail);

  if (!title?.trim() || !description?.trim() || !author?.trim() || !ownerEmail) {
    return res.status(400).json({ error: 'title, description, author, authorEmail required' });
  }

  const createdAt = nowIso();
  const ownerAvatar = avatar || author.slice(0, 2).toUpperCase();
  const ownerColor = avatarColor || '#6366f1';

  const idea = {
    id: `idea-${uid()}`,
    ideaInformation: {
      title: title.trim(),
      description: description.trim(),
      tags: Array.isArray(tags) ? tags : [],
      status: 'published',
      coverImage: coverImage || '',
      coverPosition: coverPosition || '50% 50%'
    },
    authorInformation: {
      name: author.trim(),
      email: ownerEmail,
      objectId: authorObjectId,
      avatar: ownerAvatar,
      avatarColor: ownerColor
    },
    collaboratorInformation: {
      members: [{
        id: ownerEmail,
        name: author.trim(),
        objectId: authorObjectId,
        avatar: ownerAvatar,
        avatarColor: ownerColor,
        role: 'Owner',
        email: ownerEmail,
        joinedDate: createdAt
      }]
    },
    engagement: { likes: 0, shares: 0, likedBy: [], favoritedBy: [], sharedBy: [] },
    content: { attachments: [], comments: [], collaborationNotes: [], collaborationRequests: [] },
    audit: {
      createdBy: ownerEmail,
      createdByObjectId: authorObjectId,
      createdDate: createdAt,
      updatedBy: ownerEmail,
      updatedByObjectId: authorObjectId,
      updatedDate: createdAt,
      history: [{ action: 'created', changedBy: ownerEmail, changedByObjectId: authorObjectId, changedAt: createdAt }]
    }
  };

  const db = readDb();
  db.ideas.unshift(idea);
  writeDb(db);
  res.status(201).json(idea);
});

ideasRouter.put('/:id', (req, res) => {
  const db = readDb();
  const idea = findIdea(db, req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const { title, description, tags, coverImage, coverPosition, updatedBy, updatedByObjectId } = req.body;
  const changedFields = [];

  if (title?.trim()) { idea.ideaInformation.title = title.trim(); changedFields.push('ideaInformation.title'); }
  if (description?.trim()) { idea.ideaInformation.description = description.trim(); changedFields.push('ideaInformation.description'); }
  if (Array.isArray(tags)) { idea.ideaInformation.tags = tags; changedFields.push('ideaInformation.tags'); }
  if (coverImage !== undefined) { idea.ideaInformation.coverImage = coverImage; changedFields.push('ideaInformation.coverImage'); }
  if (coverPosition !== undefined) { idea.ideaInformation.coverPosition = coverPosition; changedFields.push('ideaInformation.coverPosition'); }

  touchAudit(idea, updatedBy, updatedByObjectId, 'idea_updated', changedFields);
  writeDb(db);
  res.json(idea);
});

ideasRouter.delete('/:id', (req, res) => {
  const { deletedBy, deletedByObjectId, reason } = req.body || {};
  const db = readDb();
  const idx = db.ideas.findIndex((idea) => idea.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Idea not found' });

  const idea = db.ideas[idx];
  touchAudit(idea, deletedBy, deletedByObjectId, 'deleted', ['idea'], reason || 'hard delete');
  db.archivedIdeas = Array.isArray(db.archivedIdeas) ? db.archivedIdeas : [];
  db.archivedIdeas.push({
    ...idea,
    deletedAt: nowIso(),
    deletedBy: normalizeEmail(deletedBy) || idea.audit.updatedBy,
    deletedByObjectId
  });
  db.ideas.splice(idx, 1);

  writeDb(db);
  res.json({ deleted: req.params.id });
});

ideasRouter.post('/:id/comments', (req, res) => {
  const { text, author, avatar, avatarColor, authorEmail, authorObjectId } = req.body;
  if (!text?.trim() || !author?.trim() || !normalizeEmail(authorEmail)) {
    return res.status(400).json({ error: 'text, author, authorEmail required' });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const comment = {
    id: uid(),
    author: author.trim(),
    commenterEmail: normalizeEmail(authorEmail),
    commenterObjectId: authorObjectId,
    avatar: avatar || 'U',
    avatarColor: avatarColor || '#6366f1',
    text: text.trim(),
    date: nowIso()
  };

  idea.content.comments.push(comment);
  touchAudit(idea, authorEmail, authorObjectId, 'comment_added', ['content.comments']);
  writeDb(db);
  res.status(201).json(comment);
});

ideasRouter.post('/:id/collaborators', (req, res) => {
  const { name, email, objectId, avatar, avatarColor, role, addedBy, addedByObjectId } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!name?.trim() || !normalizedEmail) return res.status(400).json({ error: 'name and email required' });

  const db = readDb();
  const idea = findIdea(db, req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  if (idea.collaboratorInformation.members.some((member) => member.email === normalizedEmail)) {
    return res.status(409).json({ error: 'Collaborator already exists' });
  }

  const collaborator = {
    id: normalizedEmail,
    name: name.trim(),
    objectId,
    avatar: avatar || name.slice(0, 2).toUpperCase(),
    avatarColor: avatarColor || '#6366f1',
    role: role || 'Contributor',
    email: normalizedEmail,
    joinedDate: nowIso()
  };

  idea.collaboratorInformation.members.push(collaborator);
  touchAudit(idea, addedBy || normalizedEmail, addedByObjectId, 'collaborator_added', ['collaboratorInformation.members']);
  writeDb(db);
  res.status(201).json(collaborator);
});

ideasRouter.delete('/:ideaId/collaborators/:collabId', (req, res) => {
  const { removedBy, removedByObjectId } = req.body || {};
  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const collabKey = normalizeEmail(req.params.collabId);
  const before = idea.collaboratorInformation.members.length;
  idea.collaboratorInformation.members = idea.collaboratorInformation.members.filter((member) => member.id !== collabKey && member.email !== collabKey);

  if (idea.collaboratorInformation.members.length === before) {
    return res.status(404).json({ error: 'Collaborator not found' });
  }

  touchAudit(idea, removedBy, removedByObjectId, 'collaborator_removed', ['collaboratorInformation.members']);
  writeDb(db);
  res.json({ deleted: req.params.collabId });
});

ideasRouter.post('/:id/notes', (req, res) => {
  const { text, author, avatar, avatarColor, authorEmail, authorObjectId } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: 'text required' });

  const db = readDb();
  const idea = findIdea(db, req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const note = {
    id: uid(),
    author: author || 'Unknown',
    avatar: avatar || 'U',
    avatarColor: avatarColor || '#6366f1',
    text: text.trim(),
    date: nowIso(),
    pinned: false
  };

  idea.content.collaborationNotes.push(note);
  touchAudit(idea, authorEmail, authorObjectId, 'collaboration_note_added', ['content.collaborationNotes']);
  writeDb(db);
  res.status(201).json(note);
});

ideasRouter.patch('/:ideaId/notes/:noteId/pin', (req, res) => {
  const { updatedBy, updatedByObjectId } = req.body || {};
  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const note = idea.content.collaborationNotes.find((item) => item.id === req.params.noteId);
  if (!note) return res.status(404).json({ error: 'Note not found' });

  note.pinned = !note.pinned;
  touchAudit(idea, updatedBy, updatedByObjectId, 'collaboration_note_pin_toggled', ['content.collaborationNotes']);
  writeDb(db);
  res.json(note);
});

ideasRouter.post('/:id/requests', (req, res) => {
  const { requesterId, requesterObjectId, requesterName, requesterAvatar, requesterAvatarColor, message } = req.body;
  const requesterEmail = normalizeEmail(requesterId);

  if (!requesterEmail || !requesterName?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'requesterId, requesterName, message required' });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  if (idea.content.collaborationRequests.some((request) => request.requesterId === requesterEmail && request.status === 'pending')) {
    return res.status(409).json({ error: 'Request already pending' });
  }

  const request = {
    id: uid(),
    requesterId: requesterEmail,
    requesterObjectId,
    requesterName: requesterName.trim(),
    requesterAvatar: requesterAvatar || 'U',
    requesterAvatarColor: requesterAvatarColor || '#6366f1',
    message: message.trim(),
    date: nowIso(),
    status: 'pending'
  };

  idea.content.collaborationRequests.push(request);
  touchAudit(idea, requesterEmail, requesterObjectId, 'collaboration_request_added', ['content.collaborationRequests']);
  writeDb(db);
  res.status(201).json(request);
});

ideasRouter.patch('/:ideaId/requests/:reqId', (req, res) => {
  const { status, decidedBy, decidedByObjectId, decisionReason } = req.body;
  if (!['accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: "status must be 'accepted' or 'declined'" });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const request = idea.content.collaborationRequests.find((item) => item.id === req.params.reqId);
  if (!request) return res.status(404).json({ error: 'Request not found' });

  request.status = status;
  request.decidedBy = normalizeEmail(decidedBy);
  request.decidedByObjectId = decidedByObjectId;
  request.decidedAt = nowIso();
  request.decisionReason = decisionReason;

  if (status === 'accepted' && !idea.collaboratorInformation.members.some((member) => member.email === request.requesterId)) {
    idea.collaboratorInformation.members.push({
      id: request.requesterId,
      name: request.requesterName,
      objectId: request.requesterObjectId,
      avatar: request.requesterAvatar,
      avatarColor: request.requesterAvatarColor,
      role: 'Contributor',
      email: request.requesterId,
      joinedDate: nowIso()
    });
  }

  touchAudit(
    idea,
    decidedBy || request.requesterId,
    decidedByObjectId,
    status === 'accepted' ? 'collaboration_request_accepted' : 'collaboration_request_declined',
    ['content.collaborationRequests', 'collaboratorInformation.members'],
    decisionReason
  );
  writeDb(db);
  res.json(request);
});
