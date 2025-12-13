// import { Theme } from '@skgn/melkor/features';

import path from 'node:path';

export default defineNuxtConfig({
  modules: [
    '../../melkor/src/module',
    // '@skgn/melkor/nuxt',
  ],

  devtools: {
    enabled: true,
  },

  alias: {
    '@skgn/melkor/nuxt/components': path.resolve('../../melkor/src/runtime/nuxt/components/index.ts'),
    '@skgn/melkor/styles/scss': path.resolve('../../melkor/src/runtime/vue/styles/index.scss'),
    '@skgn/melkor/styles/mixins': path.resolve('../../melkor/src/runtime/vue/styles/mixins.scss'),
  },

  compatibilityDate: '2024-07-09',

  components: [
    {
      path: '@/components',
      pathPrefix: false,
      global: true,
    },
  ],

  melkor: {
    toast: {
      position: 'top-center',
    },
  },
});
