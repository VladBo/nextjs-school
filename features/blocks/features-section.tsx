import * as LucideIcons from 'lucide-react';
import { FC } from 'react';

import { Icon } from '@/components/icon';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { components } from '@/types/strapi';

type FeaturesSectionProps = {
  content: components['schemas']['SectionsFeaturesSectionComponent'];
};

export const FeaturesSection: FC<FeaturesSectionProps> = ({ content }) => {
  const { features, title, subtitle } = content;
  return (
    <section className="w-full py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 lg:gap-12">
          {features?.map(
            (feature: components['schemas']['SharedFeatureComponent']) => {
              return (
                <Card key={feature.id}>
                  <CardHeader>
                    {feature.icon ? (
                      <Icon
                        iconName={feature.icon}
                        className="mb-2 size-10 text-blue-600"
                      />
                    ) : null}
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.subtitle}</CardDescription>
                  </CardHeader>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};
