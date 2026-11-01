import { client, fetchStrapi } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';

export const getArticles = async () => {
  const response = await client.GET('/articles', {
    params: {
      query: {
        filters: {
          legacyNid: {
            $notNull: true,
          },
        },
        populate: '*',
        sort: 'sourceUpdatedAt:desc',
        pagination: {
          pageSize: 100,
        },
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetchStrapi(request, {
        ...init,
        next: { tags: [CACHE_TAGS.ARTICLES] },
        cache: 'force-cache',
      }),
  });

  if (!response.data) {
    throw new Error('Unable to load articles from Strapi');
  }

  return response.data.data ?? [];
};

export const getArticleBySlug = async (slug: string) => {
  const response = await client.GET('/articles', {
    params: {
      query: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: '*',
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetchStrapi(request, {
        ...init,
        next: { tags: [CACHE_TAGS.ARTICLES, `article-${slug}`] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data?.[0];
};
