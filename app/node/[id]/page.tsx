import { notFound, permanentRedirect } from 'next/navigation';

import {
  getLegacyAliasDestination,
  getLegacyContentAliases,
} from '@/features/content/db/legacy-aliases';

export async function generateStaticParams() {
  const aliases = await getLegacyContentAliases();
  return aliases.aliases
    .filter(({ alias }) => alias.startsWith('node/'))
    .map(({ alias }) => ({ id: alias.slice('node/'.length) }));
}

export default async function DrupalNodeAlias({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getLegacyAliasDestination(['node', id]);
  if (!destination) notFound();
  permanentRedirect(destination);
}
