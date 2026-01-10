import { notFound } from 'next/navigation';

import { BlockManager } from '@/features/blocks/block-manager';
import { getHomepage } from '@/features/homepage/db';

export default async function HomePage() {
  const homepage = await getHomepage();

  if (!homepage) {
    notFound();
  }

  return <>{homepage.blocks && <BlockManager blocks={homepage.blocks} />}</>;
}
