import { client } from '@/lib/api';

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
        next: { tags: ['header-menu'] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data;
};
