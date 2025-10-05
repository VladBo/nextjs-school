'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRef } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getStrapiMediaUrl } from '@/lib/utils';
import { components } from '@/types/strapi';

type SlideProps = {
  content: components['schemas']['SharedSliderComponent'];
};

export const Slider = ({ content }: SlideProps) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="relative h-[550px] w-full max-w-[550px]">
      <Carousel
        plugins={[plugin.current]}
        className="size-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-[550px]">
          {content?.slides?.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative size-full overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={getStrapiMediaUrl(
                    slide.image?.url ?? '/placeholder.svg'
                  )}
                  alt={slide.image?.alternativeText ?? 'Slide Image'}
                  className="object-cover"
                  priority={index === 0}
                  height={300}
                  width={600}
                />
                <div className="absolute inset-0 flex items-end bg-black/40">
                  <div className="p-6 text-white">
                    <h3 className="mb-2 text-xl font-bold">{slide.title}</h3>
                    <p className="text-sm opacity-90">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};
