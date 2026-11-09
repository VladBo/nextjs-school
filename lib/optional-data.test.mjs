import assert from 'node:assert/strict';
import test from 'node:test';

import { getOptionalData } from './optional-data.mjs';

test('keeps layout rendering when an optional Strapi request fails', async () => {
  const result = await getOptionalData(async () => {
    throw new Error('Strapi returned 429');
  });

  assert.equal(result, null);
});

test('returns optional data unchanged when the request succeeds', async () => {
  const menu = { links: [] };

  assert.equal(await getOptionalData(async () => menu), menu);
});
