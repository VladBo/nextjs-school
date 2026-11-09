import assert from 'node:assert/strict';
import test from 'node:test';

import { buildSitemapEntries, resolveSitemapBaseUrl } from './sitemap-core.mjs';

test('builds canonical URLs for fixed and migrated content routes', () => {
  const entries = buildSitemapEntries({
    baseUrl: 'https://school.example/',
    articles: [{ slug: 'first-article' }, { slug: '' }],
    pages: ['contacts', 'about'],
    courses: ['programming'],
    quizzes: [{ slug: 'quiz-one' }, { slug: null }],
  });

  assert.deepEqual(
    entries.map(({ url }) => url),
    [
      'https://school.example/',
      'https://school.example/about',
      'https://school.example/contact',
      'https://school.example/articles',
      'https://school.example/courses',
      'https://school.example/quizzes',
      'https://school.example/articles/first-article',
      'https://school.example/pages/contacts',
      'https://school.example/pages/about',
      'https://school.example/courses/programming',
      'https://school.example/quizzes/quiz-one',
    ]
  );
});

test('uses the Vercel production URL until an explicit canonical URL is configured', () => {
  assert.equal(
    resolveSitemapBaseUrl(undefined, 'janna-teacher2.com.ua'),
    'https://v0-next-js-website-rebuild-vladbos-projects.vercel.app'
  );
  assert.equal(
    resolveSitemapBaseUrl('https://school.example/'),
    'https://school.example'
  );
});
