import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DB_PATH = join(__dirname, 'db.json');

export function readDb() {
  const raw = readFileSync(DB_PATH, 'utf-8');
  // Tolerate accidental UTF-8 BOM so route handlers do not fail with 500.
  const normalized = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  return JSON.parse(normalized);
}

export function writeDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const uid  = () => uuidv4().slice(0, 8);
export const today = () => new Date().toISOString().slice(0, 10);