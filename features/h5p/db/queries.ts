import { unstable_cache } from 'next/cache';

import { client } from '@/lib/api';

export const getQuizzes = unstable_cache(
  async (filters?: { grade?: string; subject?: string }) => {
    const { data } = await client.GET('/h5p-contents', {
      params: {
        query: {
          populate: ['thumbnail', 'category'],
          filters: {
            ...(filters?.grade && { grade: { $eq: filters.grade } }),
            ...(filters?.subject && { subject: { $eq: filters.subject } }),
          },
        },
      },
    });
    return data;
  },
  ['quizzes'],
  { tags: ['h5p-contents'], revalidate: 3600 }
);

export const getQuizById = unstable_cache(
  async (id: string) => {
    const { data } = await client.GET('/h5p-contents/{id}', {
      params: {
        path: { id },
        query: { populate: ['thumbnail', 'category'] },
      },
    });
    return data;
  },
  ['quiz'],
  { tags: ['h5p-content'], revalidate: 3600 }
);

export const getFeaturedQuizzes = unstable_cache(
  async () => {
    const { data } = await client.GET('/h5p-contents', {
      params: {
        query: {
          populate: ['thumbnail'],
          filters: { featured: { $eq: true } },
          pagination: { limit: 6 },
        },
      },
    });
    return data;
  },
  ['featured-quizzes'],
  { tags: ['h5p-contents'], revalidate: 3600 }
);
