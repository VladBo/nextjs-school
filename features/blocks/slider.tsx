'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
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
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const slides = content?.slides ?? [];

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[360px] w-full max-w-[620px] sm:h-[440px] lg:h-[520px]">
      <Carousel
        aria-label="Останні події школи"
        className="size-full"
        opts={{ align: 'start', loop: slides.length > 1 }}
        plugins={slides.length > 1 ? [plugin.current] : []}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => {
            const slideUrl = (slide as typeof slide & { url?: string }).url;
            const slideContent = (
              <>
                <Image
                  src={getStrapiMediaUrl(
                    slide.image?.url ?? '/placeholder.svg'
                  )}
                  alt={
                    slide.image?.alternativeText ?? slide.title ?? 'Подія школи'
                  }
                  className="object-cover"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/35 to-transparent">
                  <div className="max-w-[85%] p-6 text-white sm:p-8">
                    <h3 className="mb-2 text-xl font-bold text-white drop-shadow-md sm:text-2xl">
                      {slide.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-white/95 drop-shadow-md sm:text-base">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </>
            );

            return (
              <CarouselItem
                key={`${slide.id ?? 'slide'}-${slide.title ?? index}`}
                className="h-full"
              >
                {slideUrl ? (
                  <Link
                    aria-label={`Докладніше: ${slide.title}`}
                    className="relative block size-full overflow-hidden rounded-xl shadow-2xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    href={slideUrl}
                  >
                    {slideContent}
                  </Link>
                ) : (
                  <div className="relative size-full overflow-hidden rounded-xl shadow-2xl">
                    {slideContent}
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {slides.length > 1 && (
          <>
            <CarouselPrevious className="left-4 z-10 size-10 border-0 bg-white/90 text-slate-900 opacity-100 shadow-lg hover:-translate-y-1/2 hover:bg-white hover:text-slate-900 disabled:opacity-50" />
            <CarouselNext className="right-4 z-10 size-10 border-0 bg-white/90 text-slate-900 opacity-100 shadow-lg hover:-translate-y-1/2 hover:bg-white hover:text-slate-900 disabled:opacity-50" />
          </>
        )}
      </Carousel>
    </div>
  );
};
