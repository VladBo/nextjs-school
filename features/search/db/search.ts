import qs from 'qs';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

type StrapiCollection<T> = {
  data: T[];
};

type ArticleSearchItem = {
  documentId: string;
  title: string;
  description?: string | null;
  slug: string;
  publishedAt?: string | null;
};

type PageSearchItem = ArticleSearchItem & {
  pageType?: string | null;
};

export type SearchResult = {
  id: string;
  title: string;
  description?: string | null;
  href: string;
  type: 'Стаття' | 'Сторінка';
  publishedAt?: string | null;
};

async function getCollection<T>(endpoint: string, query: object) {
  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}?${queryString}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to search ${endpoint}: ${response.status}`);
  }

  return (await response.json()) as StrapiCollection<T>;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const filters = {
    $or: [
      { title: { $containsi: normalizedQuery } },
      { description: { $containsi: normalizedQuery } },
    ],
  };

  const [articles, pages] = await Promise.all([
    getCollection<ArticleSearchItem>('articles', {
      fields: ['title', 'description', 'slug', 'publishedAt'],
      filters,
      pagination: { pageSize: 20 },
      sort: ['publishedAt:desc'],
    }),
    getCollection<PageSearchItem>('pages', {
      fields: ['title', 'description', 'slug', 'pageType', 'publishedAt'],
      filters,
      pagination: { pageSize: 20 },
      sort: ['sourceUpdatedAt:desc'],
    }),
  ]);

  return [
    ...articles.data.map((article) => ({
      id: article.documentId,
      title: article.title,
      description: article.description,
      href: `/articles/${article.slug}`,
      type: 'Стаття' as const,
      publishedAt: article.publishedAt,
    })),
    ...pages.data.map((page) => ({
      id: page.documentId,
      title: page.title,
      description: page.description,
      href: `/pages/${page.slug}`,
      type: 'Сторінка' as const,
      publishedAt: page.publishedAt,
    })),
  ];
}
