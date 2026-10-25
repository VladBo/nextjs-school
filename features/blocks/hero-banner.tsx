import { FC } from 'react';

import { components } from '@/types/strapi';

import { Banner } from './banner';
import { Slider } from './slider';

type HeroBannerProps = {
  content: components['schemas']['SharedHeroBannerComponent'];
};

export const HeroBanner: FC<HeroBannerProps> = ({ content }) => {
  const { banner, slider } = content;
  return (
    <section className="w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 md:grid-cols-2">
          {banner && <Banner content={banner} />}
          {slider && (
            <div className="flex items-center justify-center lg:justify-end">
              <Slider content={slider} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
