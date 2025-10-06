import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

// Modules
import { createMelkor } from '../isomorphic/plugin';

// App
export default defineNuxtPlugin(({
  name: 'melkor:nuxt-plugin',
  async setup(nuxtApp) {
    const runtimeConfig = useRuntimeConfig();

    const melkor = createMelkor(runtimeConfig.public.melkor);

    nuxtApp.vueApp.use(melkor);
  },
}));
