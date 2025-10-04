import { ComponentType, FC } from 'react';

import { components } from '@/types/strapi';

import { Media } from './media';
import { Quote } from './quote';
import { RichText } from './rich-text';
import { Slider } from './slider';

export const BLOCK_COMPONENTS: Record<string, ComponentType<any>> = {
  'shared.rich-text': RichText,
  'shared.media': Media,
  'shared.quote': Quote,
  'shared.slider': Slider,
};

export type SharedBlock =
  | components['schemas']['SharedMediaComponent']
  | components['schemas']['SharedQuoteComponent']
  | components['schemas']['SharedRichTextComponent']
  | components['schemas']['SharedSliderComponent'];

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
