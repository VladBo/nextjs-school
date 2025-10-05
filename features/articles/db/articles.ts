import { client } from '@/lib/api';

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
      fetch(request, {
        ...init,
        next: { tags: [`article-${slug}`] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data?.[0];
};
