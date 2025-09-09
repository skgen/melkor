import { Theme } from '@skgn/melkor/features';

export default defineNuxtConfig({
  modules: [
    // '@skgn/melkor-nuxt',
    '../src/module',
  ],
  sourcemap: {
    server: true,
    client: true,
  },
  melkor: {
    melkorOptions: {
      // themes: [Theme.dark, Theme.light, Theme.system],
      themes: [Theme.system, Theme.light, Theme.dark],
    },
  },
  css: [
    './src/styles/index.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  srcDir: 'src/',
  compatibilityDate: '2024-09-11',
});
