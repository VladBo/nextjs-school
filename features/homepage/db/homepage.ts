import { client } from '@/lib/api';

export const getGlobalSettings = async () => {
  const response = await client.GET('/global', {
    params: {
      query: {
        populate: '*',
      },
    },
    fetch: (request: RequestInfo, init?: RequestInit) =>
      fetch(request, {
        ...init,
        next: { tags: ['global-settings'] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data;
};

export const getHomepage = async () => {
  const response = await client.GET('/homepage', {
    params: {
      query: {
        // @ts-ignore
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
      fetch(request, {
        ...init,
        next: { tags: ['homepage'] },
        cache: 'force-cache',
      }),
  });

  return response.data?.data;
};
