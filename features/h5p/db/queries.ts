import { unstable_cache } from 'next/cache';
import qs from 'qs';

import { H5PQuizResponse, H5PQuizzesResponse } from '../types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchFromStrapi<T>(
  endpoint: string,
  query?: Record<string, unknown>
): Promise<T | null> {
  const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : '';
  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error(`Strapi fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Strapi fetch error:', error);
    return null;
  }
}

export const getQuizzes = unstable_cache(
  async (filters?: { grade?: string; subject?: string }): Promise<H5PQuizzesResponse | null> => {
    return fetchFromStrapi<H5PQuizzesResponse>('/h5p-contents', {
      populate: ['thumbnail', 'category'],
      filters: {
        ...(filters?.grade && { grade: { $eq: filters.grade } }),
        ...(filters?.subject && { subject: { $eq: filters.subject } }),
      },
    });
  },
  ['quizzes'],
  { tags: ['h5p-contents'], revalidate: 3600 }
);

export const getQuizById = unstable_cache(
  async (id: string): Promise<H5PQuizResponse | null> => {
    return fetchFromStrapi<H5PQuizResponse>(`/h5p-contents/${id}`, {
      populate: ['thumbnail', 'category'],
    });
  },
  ['quiz'],
  { tags: ['h5p-content'], revalidate: 3600 }
);

export const getFeaturedQuizzes = unstable_cache(
  async (): Promise<H5PQuizzesResponse | null> => {
    return fetchFromStrapi<H5PQuizzesResponse>('/h5p-contents', {
      populate: ['thumbnail'],
      filters: { featured: { $eq: true } },
      pagination: { limit: 6 },
    });
  },
  ['featured-quizzes'],
  { tags: ['h5p-contents'], revalidate: 3600 }
);
