import qs from 'qs';
import { cache } from 'react';

import type { SharedBlock } from '@/features/blocks/block-manager';

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

type PageResponse = {
  data: ContentPage[];
};

export const getPageBySlug = cache(async (slug: string) => {
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
  const response = await fetch(`${STRAPI_URL}/api/pages?${query}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load page: ${response.status}`);
  }

  const payload = (await response.json()) as PageResponse;
  return payload.data[0] ?? null;
});
