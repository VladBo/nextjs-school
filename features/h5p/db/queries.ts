import { unstable_cache } from 'next/cache';
import qs from 'qs';

import { H5PContentResponse, H5PContentsResponse } from '../types';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchFromStrapi<T>(
  endpoint: string,
  query?: Record<string, unknown>
): Promise<T | null> {
  const queryString = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : '';
  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export const getH5PContents = unstable_cache(
  async (): Promise<H5PContentsResponse | null> => {
    return fetchFromStrapi<H5PContentsResponse>('/h5p-contents', {
      populate: ['h5pFile'],
    });
  },
  ['h5p-contents'],
  { tags: ['h5p-contents'], revalidate: 3600 }
);

export const getH5PContentById = unstable_cache(
  async (id: string): Promise<H5PContentResponse | null> => {
    return fetchFromStrapi<H5PContentResponse>(`/h5p-contents/${id}`, {
      populate: ['h5pFile'],
    });
  },
  ['h5p-content'],
  { tags: ['h5p-content'], revalidate: 3600 }
);
