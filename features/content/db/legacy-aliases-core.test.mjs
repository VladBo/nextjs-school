import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildLegacyAliasMap,
  findLegacyAliasDestination,
  getFulfilledAliasSources,
  normalizeLegacyPath,
} from './legacy-aliases-core.mjs';

test('normalizes Drupal aliases without changing path segments', () => {
  assert.equal(normalizeLegacyPath('/Content/Kontakti/'), 'content/kontakti');
});

test('maps legacy contact, homepage, and node aliases to current routes', () => {
  const aliases = buildLegacyAliasMap([
    { record: { legacyPath: 'contact' }, base: '/pages', slug: 'contact' },
    { record: { legacyPath: 'home' }, base: '/pages', slug: 'home' },
    { record: { legacyPath: 'node/71' }, base: '/pages', slug: '71' },
  ]);

  assert.deepEqual(aliases, [
    { alias: 'contact', destination: '/pages/contact' },
    { alias: 'home', destination: '/' },
    { alias: 'node/71', destination: '/pages/71' },
  ]);
});

test('maps every migrated Drupal node id to its canonical content route', () => {
  const aliases = buildLegacyAliasMap([
    {
      record: { legacyPath: 'content/kontakti', legacyNid: 5 },
      base: '/pages',
      slug: 'kontakti',
    },
    {
      record: { legacyPath: 'content/hmarni-servisi', legacyNid: 14 },
      base: '/articles',
      slug: 'hmarni-servisi',
    },
  ]);

  assert.equal(
    findLegacyAliasDestination(aliases, 'node/5'),
    '/pages/kontakti'
  );
  assert.equal(
    findLegacyAliasDestination(aliases, 'node/14'),
    '/articles/hmarni-servisi'
  );
});

test('drops records without a usable alias or destination slug', () => {
  assert.deepEqual(
    buildLegacyAliasMap([
      { record: { legacyPath: '' }, base: '/pages', slug: 'empty' },
      { record: { legacyPath: 'contact' }, base: '/pages', slug: '' },
    ]),
    []
  );
});

test('resolves an alias from healthy content types when another source is unavailable', () => {
  const sources = getFulfilledAliasSources([
    { status: 'rejected', reason: new Error('pages returned 429') },
    {
      status: 'fulfilled',
      value: [
        {
          record: { legacyPath: 'content/hmarni-servisi' },
          base: '/quizzes',
          slug: 'hmarni-servisi',
        },
      ],
    },
  ]);
  const aliases = buildLegacyAliasMap(sources.records);

  assert.equal(
    findLegacyAliasDestination(
      aliases,
      'content/hmarni-servisi',
      sources.incomplete
    ),
    '/quizzes/hmarni-servisi'
  );
});

test('does not turn an incomplete alias lookup into a cached not-found result', () => {
  assert.throws(
    () => findLegacyAliasDestination([], 'content/missing', true),
    /Legacy alias lookup incomplete/
  );
});
