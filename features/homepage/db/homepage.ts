import { client } from '@/lib/api';

export const getGlobalSettings = async () => {
  const response = await client.GET('/global', {
    params: {
      query: {
        populate: '*',
      },
    },
  });

  return response.data?.data;
};
