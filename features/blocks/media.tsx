import Image from 'next/image';
import { FC } from 'react';

import { components } from '@/types/strapi';

type MediaProps = {
  content: components['schemas']['SharedMediaComponent'];
};

export const Media: FC<MediaProps> = ({ content }) => (
  <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
    <Image
      src={content?.file?.url ?? '/placeholder.svg'}
      alt={content.file?.name ?? ''}
      fill
      className="object-cover"
    />
  </div>
);
