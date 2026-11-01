import { client, fetchStrapi } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache';

export const getGlobalSettings = async () => {
  const response = await client.GET('/global', {
    params: {
      query: {
        populate: '*',
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetchStrapi(request, {
        ...init,
        next: { tags: ['global-settings'] },
        cache: 'force-cache',
      }),
  });

  if (!response.data) {
    throw new Error('Unable to load global settings from Strapi');
  }

  return response.data?.data;
};

export const getHomepage = async () => {
  const response = await client.GET('/homepage', {
    params: {
      query: {
        // @ts-expect-error Strapi generated types do not model populate deeply.
        populate: {
          blocks: {
            on: {
              'shared.hero-banner': {
                populate: {
                  banner: { populate: '*' },
                  slider: {
                    populate: {
                      slides: {
                        populate: 'image',
                      },
                    },
                  },
                },
              },
              'sections.features-section': {
                populate: 'features',
              },
              'sections.courses-section': {
                populate: 'courses',
              },
              'sections.articles-section': {
                populate: 'articles',
              },
            },
          },
        },
        // populate: '*',
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetchStrapi(request, {
        ...init,
        next: { tags: [CACHE_TAGS.HOMEPAGE] },
        cache: 'force-cache',
      }),
  });

  if (!response.data) {
    throw new Error('Unable to load the homepage from Strapi');
  }

  return response.data?.data;
};
