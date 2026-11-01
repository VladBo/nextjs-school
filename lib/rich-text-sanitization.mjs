import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const richTextSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': defaultSchema.attributes['*'].filter(
      (attribute) => attribute !== 'vAlign'
    ),
  },
};

/** @type {import('unified').PluggableList} */
export const rehypePlugins = [
  rehypeRaw,
  [rehypeSanitize, richTextSanitizeSchema],
];
