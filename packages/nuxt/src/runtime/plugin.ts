// Modules
import { createMelkorUI } from '@skgn/melkor/plugin';
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

// App

export default defineNuxtPlugin(({
  name: 'melkor-plugin',
  async setup(nuxtApp) {
    const runtimeConfig = useRuntimeConfig();

    const mkui = createMelkorUI(runtimeConfig.public.melkor);

    nuxtApp.vueApp.use(mkui);
  },
}));
