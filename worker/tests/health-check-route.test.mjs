import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(
  new URL('../src/worker.ts', import.meta.url),
  'utf8',
);

test('health check bypasses static asset middleware', () => {
  const apiPaths = source.match(/const API_PATHS = \[([\s\S]*?)\];/);

  assert.ok(apiPaths, 'API_PATHS should be declared');
  assert.match(apiPaths[1], /["']\/health_check["']/);
});
