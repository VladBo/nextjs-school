import Image from 'next/image';
import { FC } from 'react';

import { components } from '@/types/strapi';

type MediaProps = {
  content: components['schemas']['SharedQuoteComponent'];
};

export const Quote: FC<MediaProps> = ({ content }) => (
  <blockquote className="border-primary-500 border-l-4 pl-4 italic text-gray-600">
    {content?.title}
    {content?.body && (
      <div className="mt-2 text-sm text-gray-500">— {content.body}</div>
    )}
  </blockquote>
);
