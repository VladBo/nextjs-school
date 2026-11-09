import type { MetadataRoute } from 'next';

import courses from '@/data/courses.json';
import { getArticles } from '@/features/articles/db';
import { getH5PContents } from '@/features/h5p/db';
import { getPageSlugs } from '@/features/pages/db/pages';
import {
  buildSitemapEntries,
  resolveSitemapBaseUrl,
} from '@/features/seo/sitemap-core.mjs';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, pages, quizzes] = await Promise.all([
    getArticles(),
    getPageSlugs(),
    getH5PContents(),
  ]);
  const baseUrl = resolveSitemapBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return buildSitemapEntries({
    baseUrl,
    articles,
    pages,
    courses: Object.keys(courses),
    quizzes: quizzes.data,
  });
}
