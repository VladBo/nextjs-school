import Image from 'next/image';
import { FC } from 'react';

type ArticleImageProps = {
  src: string;
  alt: string;
};

export const ArticleImage: FC<ArticleImageProps> = ({ src, alt }) => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
      <Image
        src={src ?? '/placeholder.svg'}
        alt={alt}
        width={896}
        height={400}
        className="object-cover"
      />
    </div>
  );
};
