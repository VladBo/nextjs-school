export function findContentBySlug(contents, slug, getRouteSlug) {
  return contents.find(
    (content) => content.documentId === slug || getRouteSlug(content) === slug
  );
}
