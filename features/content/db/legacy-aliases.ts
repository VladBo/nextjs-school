import { unstable_cache } from 'next/cache';
import qs from 'qs';

import { fetchStrapi } from '@/lib/api';

import {
  buildLegacyAliasMap,
  findLegacyAliasDestination,
  getFulfilledAliasSources,
  normalizeLegacyPath,
} from './legacy-aliases-core.mjs';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const ALIAS_CACHE_TAG = 'legacy-content-aliases';

type LegacyRecord = {
  slug?: string | null;
  legacyPath?: string | null;
  legacyNid?: number | null;
};
type LegacyResponse = { data: LegacyRecord[] };
type LegacyAlias = { alias: string; destination: string };
type LegacyAliasInput = {
  record: LegacyRecord;
  base: string;
  slug: string | null | undefined;
};
type LegacyAliasLookup = { aliases: LegacyAlias[]; incomplete: boolean };
const getCachedLegacyRecords = unstable_cache(
  fetchLegacyRecords,
  ['legacy-records'],
  { tags: [ALIAS_CACHE_TAG], revalidate: false }
);

async function fetchLegacyRecords(
  collection: string,
  tags: string[],
  includeSlug = true
): Promise<LegacyRecord[]> {
  const query = qs.stringify(
    {
      fields: [...(includeSlug ? ['slug'] : []), 'legacyPath', 'legacyNid'],
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

export const getLegacyContentAliases = async (): Promise<LegacyAliasLookup> => {
  const settled = await Promise.allSettled([
    getCachedLegacyRecords('pages', ['pages']).then((records) =>
      records.map((record) => ({
        record,
        base: '/pages',
        slug: record.slug,
      }))
    ),
    getCachedLegacyRecords('articles', ['articles']).then((records) =>
      records.map((record) => ({
        record,
        base: '/articles',
        slug: record.slug,
      }))
    ),
    // Keep compatible with production Strapi while the slug schema deploys.
    getCachedLegacyRecords(
      'h5p-contents',
      ['h5p-contents', 'h5p-content'],
      false
    ).then((records) =>
      records.map((record) => ({
        record,
        base: '/quizzes',
        slug: record.legacyPath ? slugFromLegacyPath(record.legacyPath) : null,
      }))
    ),
  ]);
  const sources = getFulfilledAliasSources(
    settled as PromiseSettledResult<LegacyAliasInput[]>[]
  );

  return {
    aliases: buildLegacyAliasMap(sources.records),
    incomplete: sources.incomplete,
  };
};

function slugFromLegacyPath(path: string): string {
  return path.replace(/\/+$/, '').split('/').filter(Boolean).at(-1) || '';
}

export async function getLegacyContentDestination(path: string[]) {
  const alias = normalizeLegacyPath(`content/${path.join('/')}`);
  const lookup = await getLegacyContentAliases();
  return findLegacyAliasDestination(lookup.aliases, alias, lookup.incomplete);
}

export async function getLegacyAliasDestination(path: string[]) {
  const alias = normalizeLegacyPath(path.join('/'));
  const lookup = await getLegacyContentAliases();
  return findLegacyAliasDestination(lookup.aliases, alias, lookup.incomplete);
}
