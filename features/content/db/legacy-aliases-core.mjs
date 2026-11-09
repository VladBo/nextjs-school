export function normalizeLegacyPath(value) {
  return value.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
}

export function buildLegacyAliasMap(records) {
  return records
    .filter(({ record, slug }) => record.legacyPath && slug)
    .map(({ record, base, slug }) => {
      const alias = normalizeLegacyPath(record.legacyPath);
      return {
        alias,
        destination: alias === 'home' ? '/' : `${base}/${slug}`,
      };
    });
}
