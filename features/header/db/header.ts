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
  });

  return response.data?.data;
};
