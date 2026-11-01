import qs from 'qs';

import type { SharedBlock } from '@/features/blocks/block-manager';
import { fetchStrapi } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

type PageMedia = {
  url: string;
  alternativeText?: string | null;
};

export type ContentPage = {
  documentId: string;
  title: string;
  description?: string | null;
  slug: string;
  pageType?: string | null;
  mapEmbedUrl?: string | null;
  mapLinkUrl?: string | null;
  cover?: PageMedia | null;
  blocks?: SharedBlock[];
};

export type PageSearchItem = Pick<
  ContentPage,
  'documentId' | 'title' | 'description' | 'slug' | 'pageType'
> & { publishedAt?: string | null };

type PageResponse = {
  data: ContentPage[];
};

type PageSearchResponse = {
  data: PageSearchItem[];
};

export async function getPageSlugs(): Promise<string[]> {
  const query = qs.stringify(
    { fields: ['slug'], pagination: { pageSize: 100 } },
    { encodeValuesOnly: true }
  );
  const response = await fetchStrapi(`${STRAPI_URL}/api/pages?${query}`, {
    cache: 'force-cache',
    next: { tags: [CACHE_TAGS.PAGES] },
  });

  if (!response.ok) {
    throw new Error(`Unable to load page slugs: ${response.status}`);
  }

  const payload = (await response.json()) as PageResponse;
  return payload.data.map((page) => page.slug).filter(Boolean);
}

export async function getPagesForSearch(): Promise<PageSearchItem[]> {
  const query = qs.stringify(
    {
      fields: ['title', 'description', 'slug', 'pageType', 'publishedAt'],
      pagination: { pageSize: 100 },
    },
    { encodeValuesOnly: true }
  );
  const response = await fetchStrapi(`${STRAPI_URL}/api/pages?${query}`, {
    cache: 'force-cache',
    next: { tags: [CACHE_TAGS.PAGES] },
  });

  if (!response.ok) {
    throw new Error(`Unable to load pages for search: ${response.status}`);
  }

  const payload = (await response.json()) as PageSearchResponse;
  return payload.data;
}

export async function getPageBySlug(slug: string) {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        cover: true,
        blocks: {
          on: {
            'shared.media': { populate: '*' },
            'shared.quote': { populate: '*' },
            'shared.rich-text': { populate: '*' },
            'shared.slider': {
              populate: { slides: { populate: 'image' } },
            },
          },
        },
      },
      pagination: { pageSize: 1 },
    },
    { encodeValuesOnly: true }
  );
  const response = await fetchStrapi(`${STRAPI_URL}/api/pages?${query}`, {
    cache: 'force-cache',
    next: { tags: [CACHE_TAGS.PAGES, `page-${slug}`] },
  });

  if (!response.ok) {
    throw new Error(`Unable to load page: ${response.status}`);
  }

  const payload = (await response.json()) as PageResponse;
  return payload.data[0] ?? null;
}
