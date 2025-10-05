import { ComponentType, FC } from 'react';

import { components } from '@/types/strapi';

import { ArticlesSection } from './articles-section';
import { CoursesSection } from './courses-section';
import { FeaturesSection } from './features-section';
import { HeroBanner } from './hero-banner';
import { Media } from './media';
import { Quote } from './quote';
import { RichText } from './rich-text';
import { Slider } from './slider';

export const BLOCK_COMPONENTS: Record<string, ComponentType<any>> = {
  'shared.rich-text': RichText,
  'shared.media': Media,
  'shared.quote': Quote,
  'shared.slider': Slider,
  'shared.hero-banner': HeroBanner,
  'sections.articles-section': ArticlesSection,
  'sections.courses-section': CoursesSection,
  'sections.features-section': FeaturesSection,
};

export type SharedBlock =
  // | (components['schemas']['SharedSliderComponent'] & {
  //     __component: 'shared.slider';
  //   })
  | components['schemas']['SharedSeoComponent']
  | components['schemas']['SharedRichTextComponent']
  | components['schemas']['SharedQuoteComponent']
  | components['schemas']['SharedMediaComponent']
  | components['schemas']['SharedHeroBannerComponent']
  | components['schemas']['SectionsFeaturesSectionComponent']
  | components['schemas']['SectionsCoursesSectionComponent']
  | components['schemas']['SectionsArticlesSectionComponent'];

type BlockManagerProps = {
  blocks: SharedBlock[];
};

export const BlockManager: FC<BlockManagerProps> = ({ blocks }) => (
  <>
    {blocks?.map((block, idx) => {
      const Component = block.__component
        ? BLOCK_COMPONENTS[block.__component]
        : null;
      if (!Component) return null;
      return <Component key={idx} content={block} />;
    })}
  </>
);
