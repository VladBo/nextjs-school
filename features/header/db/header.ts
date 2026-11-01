import { client, fetchStrapi } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';

export const getHeaderMenu = async () => {
  const response = await client.GET('/header-menu', {
    params: {
      query: {
        // @ts-expect-error Strapi generated types do not model populate deeply.
        populate: {
          links: { populate: '*' },
        },
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetchStrapi(request, {
        ...init,
        next: { tags: [CACHE_TAGS.HEADER_MENU] },
        cache: 'force-cache',
      }),
  });

  if (!response.data) {
    throw new Error('Unable to load the header menu from Strapi');
  }

  return response.data?.data;
};
