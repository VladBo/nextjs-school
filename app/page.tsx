import { notFound } from 'next/navigation';
import { FC } from 'react';

import { BlockManager } from '@/features/blocks/block-manager';
import { getHomepage } from '@/features/homepage/db';

const HomePage: FC = async () => {
  const homepage = await getHomepage();

  if (!homepage) {
    notFound();
  }

  return <>{homepage.blocks && <BlockManager blocks={homepage.blocks} />}</>;
};

export default HomePage;
