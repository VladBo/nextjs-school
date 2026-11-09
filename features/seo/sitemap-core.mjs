export function resolveSitemapBaseUrl(configuredUrl) {
  const candidate = configuredUrl?.trim()
    ? configuredUrl.trim()
    : 'https://v0-next-js-website-rebuild-vladbos-projects.vercel.app';

  const url = new URL(candidate);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Sitemap base URL must use HTTP or HTTPS');
  }

  return url.origin;
}

export function buildSitemapEntries({
  baseUrl,
  articles = [],
  pages = [],
  courses = [],
  quizzes = [],
}) {
  const paths = [
    '/',
    '/about',
    '/contact',
    '/articles',
    '/courses',
    '/quizzes',
    ...articles.map(({ slug }) => (slug ? `/articles/${slug}` : null)),
    ...pages.map((slug) => (slug ? `/pages/${slug}` : null)),
    ...courses.map((slug) => (slug ? `/courses/${slug}` : null)),
    ...quizzes.map(({ slug }) => (slug ? `/quizzes/${slug}` : null)),
  ].filter(Boolean);

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, baseUrl).toString(),
  }));
}
