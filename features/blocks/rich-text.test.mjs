import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';

import { rehypePlugins } from '../../lib/rich-text-sanitization.mjs';

const fixture = `
<table><tbody><tr><td valign="middle">Понеділок</td><td>08:00</td></tr></tbody></table>
<script>window.compromised = true</script>
<img src="x" onerror="window.compromised = true">
[небезпечне посилання](javascript:alert%281%29)
<a href="javascript:alert(1)">небезпечне посилання HTML</a>
`;

test('renders schedule tables but removes unsafe rich-text markup', () => {
  const html = renderToStaticMarkup(
    createElement(Markdown, { rehypePlugins, children: fixture })
  );

  assert.match(html, /<table[ >]/);
  assert.match(html, /Понеділок/);
  assert.doesNotMatch(html, /<script/i);
  assert.doesNotMatch(html, /onerror/i);
  assert.doesNotMatch(html, /\bvAlign=/i);
  assert.doesNotMatch(html, /href=["']?javascript:/i);
  assert.match(html, /<a>небезпечне посилання HTML<\/a>/);
});
