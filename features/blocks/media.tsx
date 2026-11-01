import Image from 'next/image';
import { FC } from 'react';

import { getStrapiMediaUrl } from '@/lib/utils';
import { components } from '@/types/strapi';

type MediaProps = {
  content: components['schemas']['SharedMediaComponent'];
};

export const Media: FC<MediaProps> = ({ content }) => (
  <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
    <Image
      src={
        content?.file?.url
          ? getStrapiMediaUrl(content.file.url)
          : '/placeholder.svg'
      }
      alt={content.file?.name ?? ''}
      fill
      sizes="(max-width: 896px) 100vw, 896px"
      className="object-cover"
    />
  </div>
);
