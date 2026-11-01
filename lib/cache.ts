export const CACHE_TAGS = {
  GLOBAL_SETTINGS: 'global-settings',
  HOMEPAGE: 'homepage',
  HEADER_MENU: 'header-menu',
  FOOTER_MENU: 'footer-menu',
  ARTICLES: 'articles',
  COURSES: 'courses',
  H5P_CONTENTS: 'h5p-contents',
  H5P_CONTENT: 'h5p-content',
  H5P_ASSETS: 'h5p-assets',
  PAGES: 'pages',
  AUTHORS: 'authors',
  CATEGORIES: 'categories',
  TAGS: 'tags',
} as const;

export const CONTENT_TYPE_CACHE_MAP = {
  // Simplified model names (what Strapi actually sends)
  global: [CACHE_TAGS.GLOBAL_SETTINGS],
  homepage: [CACHE_TAGS.HOMEPAGE],
  'header-menu': [CACHE_TAGS.HEADER_MENU],
  'footer-menu': [CACHE_TAGS.FOOTER_MENU],
  article: [CACHE_TAGS.ARTICLES, CACHE_TAGS.HOMEPAGE],
  page: [CACHE_TAGS.PAGES],
  course: [CACHE_TAGS.COURSES, CACHE_TAGS.HOMEPAGE],
  'h5p-content': [
    CACHE_TAGS.H5P_CONTENTS,
    CACHE_TAGS.H5P_CONTENT,
    CACHE_TAGS.H5P_ASSETS,
  ],
  author: [CACHE_TAGS.AUTHORS],
  category: [CACHE_TAGS.CATEGORIES],
  tag: [CACHE_TAGS.TAGS],
} as const;
