import { client, fetchStrapi } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';
import { logger } from '@/lib/logger';
import { getOptionalData } from '@/lib/optional-data.mjs';

export const getFooterMenu = async () => {
  const response = await getOptionalData(
    async () => {
      const result = await client.GET('/footer-menu', {
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
            next: { tags: [CACHE_TAGS.FOOTER_MENU] },
            cache: 'force-cache',
          }),
      });

      if (!result.data) {
        throw new Error('Unable to load the footer menu from Strapi');
      }

      return result.data?.data;
    },
    (error) =>
      logger.error('Unable to load the footer menu from Strapi:', error)
  );
  return response ?? null;
};
