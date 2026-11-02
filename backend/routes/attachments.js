import { Router } from 'express';
import { readDb, writeDb, uid } from '../data/db.helper.js';

export const attachmentsRouter = Router();

const MAX_BYTES = 5 * 1024 * 1024;
const normalizeEmail = (value = '') => String(value).trim().toLowerCase();
const nowIso = () => new Date().toISOString();

const findIdea = (db, id) => db.ideas.find((idea) => idea.id === id);

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

attachmentsRouter.post('/:ideaId', (req, res) => {
  const { name, size, type, dataUrl, uploadedBy, uploadedByEmail, uploadedByObjectId } = req.body;
  if (!name || !dataUrl || !uploadedBy) {
    return res.status(400).json({ error: 'name, dataUrl and uploadedBy are required' });
  }
  if (size > MAX_BYTES) {
    return res.status(413).json({ error: `"${name}" exceeds the 5 MB limit` });
  }

  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const attachment = {
    id: uid(),
    name,
    size,
    type,
    dataUrl,
    uploadedBy,
    uploadedByEmail: normalizeEmail(uploadedByEmail),
    uploadedByObjectId,
    uploadedDate: nowIso()
  };

  idea.content.attachments.push(attachment);
  touchAudit(idea, uploadedByEmail, uploadedByObjectId, 'attachment_added', ['content.attachments']);
  writeDb(db);
  res.status(201).json(attachment);
});

attachmentsRouter.delete('/:ideaId/:attachmentId', (req, res) => {
  const actor = normalizeEmail(req.body?.updatedBy);
  const actorObjectId = req.body?.updatedByObjectId;
  const db = readDb();
  const idea = findIdea(db, req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const before = idea.content.attachments.length;
  idea.content.attachments = idea.content.attachments.filter((a) => a.id !== req.params.attachmentId);
  if (idea.content.attachments.length === before) {
    return res.status(404).json({ error: 'Attachment not found' });
  }

  touchAudit(idea, actor, actorObjectId, 'attachment_deleted', ['content.attachments']);
  writeDb(db);
  res.json({ deleted: req.params.attachmentId });
});
