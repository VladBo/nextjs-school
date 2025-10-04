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
  });

  return response.data?.data?.[0];
};
