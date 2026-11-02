import { Router } from 'express';
import { readDb, writeDb } from '../data/db.helper.js';

export const usersRouter = Router();
const SUPER_ADMIN_EMAIL = 'naveen.basavarajappa@volvo.com';

const normalizeEmail = (value) => typeof value === 'string' ? value.trim().toLowerCase() : '';
const isAdmin = (db, email) => (db.users ?? []).some((user) =>
  normalizeEmail(user.email) === email && user.role === 'Admin'
);

const requireAdmin = (req, res) => {
  const requestedBy = normalizeEmail(req.body?.requestedBy ?? req.query.requestedBy);
  if (!requestedBy || !isAdmin(readDb(), requestedBy)) {
    res.status(403).json({ error: 'Administrator access is required' });
    return false;
  }
  return true;
};

usersRouter.get('/me', (req, res) => {
  const email = normalizeEmail(req.query.email);

  if (!email) {
    return res.status(400).json({ error: 'An email query parameter is required' });
  }

  try {
    const user = (readDb().users ?? []).find((entry) => entry.email?.toLowerCase() === email);
    res.json({ role: user?.role ?? 'User' });
  } catch {
    res.status(500).json({ error: 'Could not resolve user role' });
  }
});

usersRouter.get('/admins', (req, res) => {
  try {
    if (!requireAdmin(req, res)) return;

    const admins = (readDb().users ?? [])
      .filter((user) => user.role === 'Admin')
      .map((user) => ({
        email: normalizeEmail(user.email),
        isSuperAdmin: normalizeEmail(user.email) === SUPER_ADMIN_EMAIL
      }));

    res.json({ admins });
  } catch {
    res.status(500).json({ error: 'Could not load administrators' });
  }
});

usersRouter.post('/admins', (req, res) => {
  const email = normalizeEmail(req.body?.email);
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address' });
  }
  if (email === SUPER_ADMIN_EMAIL) {
    return res.status(403).json({ error: 'The super administrator role cannot be changed' });
  }

  try {
    if (!requireAdmin(req, res)) return;

    const db = readDb();
    const users = db.users ?? [];
    const user = users.find((entry) => normalizeEmail(entry.email) === email);
    if (user) user.role = 'Admin';
    else users.push({ email, role: 'Admin' });

    db.users = users;
    writeDb(db);
    res.status(201).json({ email, role: 'Admin' });
  } catch {
    res.status(500).json({ error: 'Could not add administrator' });
  }
});

usersRouter.delete('/admins/:email', (req, res) => {
  const email = normalizeEmail(req.params.email);
  if (email === SUPER_ADMIN_EMAIL) {
    return res.status(403).json({ error: 'The super administrator cannot be removed' });
  }

  try {
    if (!requireAdmin(req, res)) return;

    const db = readDb();
    const users = db.users ?? [];
    if (!users.some((user) => normalizeEmail(user.email) === email && user.role === 'Admin')) {
      return res.status(404).json({ error: 'Administrator not found' });
    }

    db.users = users.filter((user) => normalizeEmail(user.email) !== email);
    writeDb(db);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Could not remove administrator' });
  }
});