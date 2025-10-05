import { client } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';

export const getHeaderMenu = async () => {
  const response = await client.GET('/header-menu', {
    params: {
      query: {
        // @ts-ignore
        populate: {
          links: { populate: '*' },
        },
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetch(request, {
        ...init,
        next: { tags: [CACHE_TAGS.HEADER_MENU] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data;
};
