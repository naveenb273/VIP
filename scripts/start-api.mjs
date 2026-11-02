import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Starts the backend API in watch mode. On machines behind a TLS-inspecting
 * corporate proxy, Node cannot chain the intercepted certificate to its bundled
 * CA store. If a local `corporate-ca-bundle.pem` exists at the repository root,
 * it is trusted via NODE_EXTRA_CA_CERTS before the backend process starts.
 *
 * The bundle is git-ignored and machine-specific, so coworkers who do not have
 * the file are unaffected.
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const caBundle = join(repoRoot, 'corporate-ca-bundle.pem');
const env = { ...process.env };

if (!env.NODE_EXTRA_CA_CERTS && existsSync(caBundle)) {
  env.NODE_EXTRA_CA_CERTS = caBundle;
  console.log(`[start-api] Trusting corporate CA bundle: ${caBundle}`);
}

const child = spawn('npm', ['run', 'dev', '--prefix', 'backend'], {
  cwd: repoRoot,
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

child.on('exit', (code) => process.exit(code ?? 0));
