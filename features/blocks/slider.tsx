import Image from 'next/image';

import { components } from '@/types/strapi';

type SlideProps = {
  content: components['schemas']['SharedSliderComponent'];
};

export const Slider = ({ content }: SlideProps) => {
  return (
    <div>
      {content?.files?.map((file) => (
        <Image key={file.id} src={file.url ?? ''} alt={file.name ?? ''} />
      ))}
    </div>
  );
};
