import { revalidatePath, revalidateTag } from 'next/cache';

export const CACHE_TAGS = {
  GLOBAL_SETTINGS: 'global-settings',
  HOMEPAGE: 'homepage',
  HEADER_MENU: 'header-menu',
  ARTICLES: 'articles',
  COURSES: 'courses',
  AUTHORS: 'authors',
  CATEGORIES: 'categories',
  TAGS: 'tags',
} as const;

export const CONTENT_TYPE_CACHE_MAP = {
  'api::global.global': [CACHE_TAGS.GLOBAL_SETTINGS],
  'api::homepage.homepage': [CACHE_TAGS.HOMEPAGE],
  'api::header-menu.header-menu': [CACHE_TAGS.HEADER_MENU],
  'api::article.article': [CACHE_TAGS.ARTICLES, CACHE_TAGS.HOMEPAGE],
  'api::course.course': [CACHE_TAGS.COURSES, CACHE_TAGS.HOMEPAGE],
  'api::author.author': [CACHE_TAGS.AUTHORS],
  'api::category.category': [CACHE_TAGS.CATEGORIES],
  'api::tag.tag': [CACHE_TAGS.TAGS],
} as const;
