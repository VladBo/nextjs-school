import Markdown, { type Components, defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { rehypePlugins } from '@/lib/rich-text-sanitization.mjs';
import { components } from '@/types/strapi';

type RichTextProps = {
  content: components['schemas']['SharedRichTextComponent'];
};

const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="not-prose w-full overflow-x-auto rounded-md border">
      <table className="w-full min-w-[640px] border-collapse text-sm [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:bg-muted [&_th]:p-2">
        {children}
      </table>
    </div>
  ),
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
      rehypePlugins={rehypePlugins}
      remarkPlugins={[remarkGfm]}
      urlTransform={(url) =>
        url.startsWith('tel:') ? url : defaultUrlTransform(url)
      }
    >
      {content?.body}
    </Markdown>
  </div>
);
