import { unstable_cache } from 'next/cache';

import { getArticles } from '@/features/articles/db';
import { getPagesForSearch } from '@/features/pages/db/pages';
import { CACHE_TAGS } from '@/lib/cache';

export type SearchResult = {
  id: string;
  title: string;
  description?: string | null;
  href: string;
  type: 'Стаття' | 'Сторінка';
  publishedAt?: string | null;
};

export const getSearchIndex = unstable_cache(
  async (): Promise<SearchResult[]> => {
    const [articles, pages] = await Promise.all([
      getArticles(),
      getPagesForSearch(),
    ]);

    return [
      ...articles.flatMap((article) =>
        article.documentId && article.title && article.slug
          ? [
              {
                id: article.documentId,
                title: article.title,
                description: article.description,
                href: `/articles/${article.slug}`,
                type: 'Стаття' as const,
                publishedAt: article.publishedAt,
              },
            ]
          : []
      ),
      ...pages.map((page) => ({
        id: page.documentId,
        title: page.title,
        description: page.description,
        href: `/pages/${page.slug}`,
        type: 'Сторінка' as const,
        publishedAt: page.publishedAt,
      })),
    ];
  },
  ['site-search-index'],
  { tags: [CACHE_TAGS.ARTICLES, CACHE_TAGS.PAGES], revalidate: false }
);

export async function searchContent(query: string): Promise<SearchResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const searchTerms = normalizedQuery.toLocaleLowerCase('uk-UA');
  const index = await getSearchIndex();

  return index.filter((item) =>
    `${item.title} ${item.description ?? ''}`
      .toLocaleLowerCase('uk-UA')
      .includes(searchTerms)
  );
}
