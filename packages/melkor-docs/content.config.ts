import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    components: defineCollection({
      type: 'page',
      source: 'components/*.md',
    }),
  },
});
