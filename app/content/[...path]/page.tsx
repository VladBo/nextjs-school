import { notFound, permanentRedirect } from 'next/navigation';

import {
  getLegacyContentAliases,
  getLegacyContentDestination,
} from '@/features/content/db/legacy-aliases';

export async function generateStaticParams() {
  const aliases = await getLegacyContentAliases();
  return aliases.aliases
    .filter(({ alias }) => alias.startsWith('content/'))
    .map(({ alias }) => ({
      path: alias.slice('content/'.length).split('/'),
    }));
}

export default async function DrupalAliasRedirect({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const destination = await getLegacyContentDestination(path);
  if (!destination) notFound();
  permanentRedirect(destination);
}
