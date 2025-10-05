import { client } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';

export const getFooterMenu = async () => {
  const response = await client.GET('/footer-menu', {
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
        next: { tags: [CACHE_TAGS.FOOTER_MENU] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data;
};
