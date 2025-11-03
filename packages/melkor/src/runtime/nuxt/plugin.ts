import type { MelkorOptions } from './features';

import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

// Modules
import { createMelkor } from '../vue/plugin';

// App
export default defineNuxtPlugin(({
  name: 'melkor:nuxt-plugin',
  async setup(nuxtApp) {
    const runtimeConfig = useRuntimeConfig();

    nuxtApp.vueApp.use(createMelkor, runtimeConfig.public.melkor as MelkorOptions);
  },
}));
