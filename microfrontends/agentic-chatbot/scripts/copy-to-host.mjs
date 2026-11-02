import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'dist');
const target = resolve(root, '..', '..', 'frontend', 'src', 'assets', 'mfe', 'agentic-chatbot');

if (!existsSync(source)) {
  console.error('[agentic-chatbot] build output not found at', source);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log('[agentic-chatbot] published bundle to', target);
