import { defineCollection, defineContentConfig, z } from '@nuxt/content';

// import { normalizedPropertiesASTSchema } from './src/lib/components';

export default defineContentConfig({
  collections: {
    // components: defineCollection({
    //   type: 'page',
    //   source: 'components/*.md',
    // }),
    docs: defineCollection({
      type: 'page',
      source: [{
        include: 'docs/**/*',
      }],
      schema: z.object({
        name: z.string().optional(),
        category: z.enum([
          'generic',
          'inputs',
          'layout',
          'overlay',
        ]).optional(),
        framework: z.enum(['nuxt', 'vue']).optional(),
        links: z.array(
          z.object({
            label: z.string(),
            icon: z.string(),
            to: z.string(),
            target: z.literal('_blank').optional(),
          }),
        ),
      }),
    }),
    // componentPropsSchema: defineCollection({
    //   type: 'data',
    //   schema: normalizedPropertiesASTSchema,
    //   source: 'generated/components/**.json',
    // }),
  },
});
