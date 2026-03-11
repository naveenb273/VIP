import { Router } from 'express';
import { readDb, writeDb, uid, today } from '../data/db.helper.js';

export const attachmentsRouter = Router();

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// POST /api/attachments/:ideaId
attachmentsRouter.post('/:ideaId', (req, res) => {
  const { name, size, type, dataUrl, uploadedBy } = req.body;
  if (!name || !dataUrl || !uploadedBy)
    return res.status(400).json({ error: 'name, dataUrl and uploadedBy are required' });
  if (size > MAX_BYTES)
    return res.status(413).json({ error: `"${name}" exceeds the 5 MB limit` });

  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const attachment = { id: uid(), name, size, type, dataUrl, uploadedBy, uploadedDate: today() };
  idea.attachments.push(attachment);
  writeDb(db);
  res.status(201).json(attachment);
});

// DELETE /api/attachments/:ideaId/:attachmentId
attachmentsRouter.delete('/:ideaId/:attachmentId', (req, res) => {
  const db   = readDb();
  const idea = db.ideas.find(i => i.id === req.params.ideaId);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });

  const before     = idea.attachments.length;
  idea.attachments = idea.attachments.filter(a => a.id !== req.params.attachmentId);
  if (idea.attachments.length === before)
    return res.status(404).json({ error: 'Attachment not found' });

  writeDb(db);
  res.json({ deleted: req.params.attachmentId });
});
