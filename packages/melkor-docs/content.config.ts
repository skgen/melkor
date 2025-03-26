import { defineCollection, defineContentConfig } from '@nuxt/content';
import { propertyASTSchema } from './src/lib/components';

export default defineContentConfig({
  collections: {
    componentPropsSchema: defineCollection({
      type: 'data',
      schema: propertyASTSchema,
      source: 'generated/components/**.json',
    }),
  },
});
