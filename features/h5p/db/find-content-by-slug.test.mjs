import assert from 'node:assert/strict';
import test from 'node:test';

import { findContentBySlug } from './find-content-by-slug.mjs';

test('finds the published H5P record from the cached collection response', () => {
  const item = {
    documentId: 'cloud-services',
    slug: 'hmarni-servisi',
    sourceLocale: 'uk',
    h5pContent: { contentId: 3166329430 },
  };

  assert.equal(
    findContentBySlug([item], 'hmarni-servisi', (content) => content.slug),
    item
  );
});
