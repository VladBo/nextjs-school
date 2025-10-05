import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { components } from '@/types/strapi';

import { Slider } from './slider';

type BannerProps = {
  content: components['schemas']['SharedBannerComponent'];
};

export const Banner: FC<BannerProps> = ({ content }) => {
  const { title, subtitle, buttons } = content;
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          {title}
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        {buttons?.map((button, index) => (
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
  );
};
