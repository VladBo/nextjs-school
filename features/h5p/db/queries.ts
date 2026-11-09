import { unstable_cache } from 'next/cache';
import qs from 'qs';

import { fetchStrapi } from '@/lib/api';
import { logger } from '@/lib/logger';

import { H5PContentResponse, H5PContentsResponse } from '../types';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchFromStrapi<T>(
  endpoint: string,
  query?: Record<string, unknown>
): Promise<T> {
  const queryString = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : '';
  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  try {
    const response = await fetchStrapi(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi fetch error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    logger.error('Strapi fetch error:', error);
    throw error;
  }
}

export const getH5PContents = unstable_cache(
  async (): Promise<H5PContentsResponse> => {
    return fetchFromStrapi<H5PContentsResponse>('/h5p-contents', {
      filters: {
        sourceLocale: {
          $eq: 'uk',
        },
      },
      sort: ['createdAt:desc'],
    });
  },
  ['h5p-contents', 'uk'],
  { tags: ['h5p-contents'], revalidate: false }
);

export const getH5PContentById = unstable_cache(
  async (id: string): Promise<H5PContentResponse> => {
    return fetchFromStrapi<H5PContentResponse>(`/h5p-contents/${id}`);
  },
  ['h5p-content'],
  { tags: ['h5p-content'], revalidate: false }
);
