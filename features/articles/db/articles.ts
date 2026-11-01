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
  // Reuse the cached list fetched for static params. Querying once per slug
  // fans out many concurrent requests to Strapi during a full SSG build.
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
};
