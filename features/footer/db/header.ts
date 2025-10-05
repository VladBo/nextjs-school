import { client } from '@/lib/api';

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
        next: { tags: ['footer-menu'] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data;
};
