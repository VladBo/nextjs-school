import { notFound } from 'next/navigation';
import { FC } from 'react';

import { BlockManager } from '@/features/blocks/block-manager';
import { getHomepage } from '@/features/homepage/db';

const HomePage: FC = async () => {
  const homepage = await getHomepage();

  if (!homepage) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {homepage.blocks && <BlockManager blocks={homepage.blocks} />}
      </main>
    </div>
  );
};

export default HomePage;
