import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { components } from '@/types/strapi';

type RichTextProps = {
  content: components['schemas']['SharedRichTextComponent'];
};

export const RichText = ({ content }: RichTextProps) => (
  <div className="prose prose-gray prose-lg max-w-none">
    <Markdown children={content?.body} remarkPlugins={[remarkGfm]} />
  </div>
);
