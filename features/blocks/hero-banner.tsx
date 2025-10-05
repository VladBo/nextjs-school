import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { components } from '@/types/strapi';

import { Slider } from './slider';

type SlideProps = {
  content: components['schemas']['SharedHeroBannerComponent'];
};

export const HeroBanner: FC<SlideProps> = ({ content }) => {
  const { banner, slider } = content;
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-6 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {banner?.title}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                {banner?.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {banner?.buttons?.map((button, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  variant={button.primary === true ? 'default' : 'outline'}
                >
                  <Link href={button?.URL ?? ''}>
                    {button?.title}
                    {button.primary === true && (
                      <ArrowRight className="ml-2 size-4" />
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
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
