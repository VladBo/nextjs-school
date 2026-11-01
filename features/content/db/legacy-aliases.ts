import { unstable_cache } from 'next/cache';
import qs from 'qs';

import { fetchStrapi } from '@/lib/api';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const ALIAS_CACHE_TAG = 'legacy-content-aliases';

type LegacyRecord = {
  slug?: string | null;
  legacyPath?: string | null;
};
type LegacyResponse = { data: LegacyRecord[] };

function normalizeLegacyPath(value: string): string {
  return value.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
}

async function fetchLegacyRecords(
  collection: string,
  tags: string[],
  includeSlug = true
): Promise<LegacyRecord[]> {
  const query = qs.stringify(
    {
      fields: [...(includeSlug ? ['slug'] : []), 'legacyPath'],
      pagination: { pageSize: 100 },
    },
    { encodeValuesOnly: true }
  );
  const response = await fetchStrapi(
    `${STRAPI_URL}/api/${collection}?${query}`,
    {
      cache: 'force-cache',
      next: { tags: [...tags, ALIAS_CACHE_TAG] },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Unable to load ${collection} legacy aliases: ${response.status}`
    );
  }
  const payload = (await response.json()) as LegacyResponse;
  return payload.data;
}

export const getLegacyContentAliases = unstable_cache(
  async () => {
    const [pages, articles, quizzes] = await Promise.all([
      fetchLegacyRecords('pages', ['pages']),
      fetchLegacyRecords('articles', ['articles']),
      // Keep compatible with production Strapi while the slug schema deploys.
      fetchLegacyRecords(
        'h5p-contents',
        ['h5p-contents', 'h5p-content'],
        false
      ),
    ]);

    return [
      ...pages.map((record) => ({ record, base: '/pages', slug: record.slug })),
      ...articles.map((record) => ({
        record,
        base: '/articles',
        slug: record.slug,
      })),
      ...quizzes.map((record) => ({
        record,
        base: '/quizzes',
        slug:
          record.slug ||
          (record.legacyPath ? slugFromLegacyPath(record.legacyPath) : null),
      })),
    ]
      .filter(({ record, slug }) => record.legacyPath && slug)
      .map(({ record, base, slug }) => ({
        alias: normalizeLegacyPath(record.legacyPath as string),
        destination: `${base}/${slug}`,
      }))
      .filter(({ alias }) => alias.startsWith('content/'));
  },
  ['legacy-content-aliases'],
  { tags: [ALIAS_CACHE_TAG], revalidate: false }
);

function slugFromLegacyPath(path: string): string {
  return path.replace(/\/+$/, '').split('/').filter(Boolean).at(-1) || '';
}

export async function getLegacyContentDestination(path: string[]) {
  const alias = normalizeLegacyPath(`content/${path.join('/')}`);
  const match = (await getLegacyContentAliases()).find(
    (item) => item.alias === alias
  );
  return match?.destination;
}
