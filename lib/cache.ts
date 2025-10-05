import { revalidatePath, revalidateTag } from 'next/cache';

export const CACHE_TAGS = {
  GLOBAL_SETTINGS: 'global-settings',
  HOMEPAGE: 'homepage',
  HEADER_MENU: 'header-menu',
  FOOTER_MENU: 'footer-menu',
  ARTICLES: 'articles',
  COURSES: 'courses',
  AUTHORS: 'authors',
  CATEGORIES: 'categories',
  TAGS: 'tags',
} as const;

export const CONTENT_TYPE_CACHE_MAP = {
  // Simplified model names (what Strapi actually sends)
  global: [CACHE_TAGS.GLOBAL_SETTINGS],
  homepage: [CACHE_TAGS.HOMEPAGE],
  'header-menu': [CACHE_TAGS.HEADER_MENU],
  'footer-menu': [CACHE_TAGS.HEADER_MENU],
  article: [CACHE_TAGS.ARTICLES, CACHE_TAGS.HOMEPAGE],
  course: [CACHE_TAGS.COURSES, CACHE_TAGS.HOMEPAGE],
  author: [CACHE_TAGS.AUTHORS],
  category: [CACHE_TAGS.CATEGORIES],
  tag: [CACHE_TAGS.TAGS],
} as const;
