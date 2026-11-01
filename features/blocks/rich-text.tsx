import Markdown, { type Components, defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { components } from '@/types/strapi';

type RichTextProps = {
  content: components['schemas']['SharedRichTextComponent'];
};

const markdownComponents: Components = {
  a: ({ children, href, title }) => {
    const isExternal = href?.startsWith('http');

    return (
      <a
        className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-900"
        href={href}
        rel={isExternal ? 'noreferrer' : undefined}
        target={isExternal ? '_blank' : undefined}
        title={title}
      >
        {children}
      </a>
    );
  },
};

export const RichText = ({ content }: RichTextProps) => (
  <div className="prose prose-lg prose-gray max-w-none">
    <Markdown
      components={markdownComponents}
      remarkPlugins={[remarkGfm]}
      urlTransform={(url) =>
        url.startsWith('tel:') ? url : defaultUrlTransform(url)
      }
    >
      {content?.body}
    </Markdown>
  </div>
);
