import { Theme } from '@skgn/melkor/features';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    // '@skgn/melkor-nuxt',
    '@nuxt/content',
    '../melkor-nuxt/src/module',
  ],
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
  app: {
    head: {
      title: 'Melkor Docs !',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  srcDir: 'src/',
  compatibilityDate: '2024-09-11',
  // routeRules: {
  //   '/': {
  //     ssr: true,
  //   },
  //   '/back': {
  //     ssr: true,
  //   },
  // },
  // nitro: {
  //   preset: 'node-server',
  // },
  melkor: {
    melkorOptions: {
      debug: true,
      themes: [Theme.system, Theme.dark, Theme.light, 'square'],
      icons: {
        AppThemeToggle: {
          square: 'material-symbols:activity-zone',
        },
      },
    },
  },
});
