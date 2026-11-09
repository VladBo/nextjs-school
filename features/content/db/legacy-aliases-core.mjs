export function normalizeLegacyPath(value) {
  return value.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
}

export function getFulfilledAliasSources(results) {
  return {
    records: results.flatMap((result) =>
      result.status === 'fulfilled' ? result.value : []
    ),
    incomplete: results.some((result) => result.status === 'rejected'),
  };
}

export function findLegacyAliasDestination(aliases, alias, incomplete = false) {
  const match = aliases.find(
    (item) => item.alias === normalizeLegacyPath(alias)
  );
  if (match) return match.destination;
  if (incomplete) throw new Error('Legacy alias lookup incomplete');
  return undefined;
}

export function buildLegacyAliasMap(records) {
  return records
    .filter(({ record, slug }) => record.legacyPath && slug)
    .flatMap(({ record, base, slug }) => {
      const alias = normalizeLegacyPath(record.legacyPath);
      const destination = alias === 'home' ? '/' : `${base}/${slug}`;
      const aliases = [{ alias, destination }];

      if (record.legacyNid != null) {
        aliases.push({ alias: `node/${record.legacyNid}`, destination });
      }

      return aliases;
    });
}
