import { Tag } from 'lucide-react';
import { FC } from 'react';

import { Tags } from '@/components/tags';
import { Badge } from '@/components/ui/badge';
import { BlockManager, SharedBlock } from '@/features/blocks/block-manager';
import { components } from '@/types/strapi';

type ArticleBlocksProps = {
  blocks?: SharedBlock[];
  tags?: string[];
};

export const ArticleBlocks: FC<ArticleBlocksProps> = ({ blocks, tags }) => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {blocks && <BlockManager blocks={blocks} />}
          {tags && tags.length > 0 && <Tags tags={tags} />}
        </div>
      </div>
    </section>
  );
};
