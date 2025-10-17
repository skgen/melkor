// import { Theme } from '@skgn/melkor-nuxt/features';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 1337,
  },
  modules: [
    '@skgn/melkor/nuxt',
    '@nuxt/content',
    // '../melkor-nuxt/src/module',
  ],
  css: [
    // './src/styles/index.scss',
  ],
  // typescript: {
  //   typeCheck: true,
  // },
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
  compatibilityDate: '2024-09-11',
  components: [
    {
      path: '@/components',
      pathPrefix: false,
      global: true,
    },
  ],
  melkor: {
    melkorOptions: {
      debug: true,
      // themes: [Theme.system, Theme.dark, Theme.light, 'square'],
      // themes: ['system', 'dark', 'light', 'square'],
      icons: {
        AppThemeToggle: {
          square: 'material-symbols:activity-zone',
        },
      },
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'dark-plus',
            dark: 'dark-plus',
            light: 'light-plus',
          },
          langs: [
            'typescript',
          ],
        },
      },
    },
  },
  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  routeRules: {
    // v4 redirects - moved to `docs/`
    // '/getting-started/**': { redirect: { to: '/docs/getting-started/**', statusCode: 301 }, prerender: false },
    // '/components/**': { redirect: { to: '/docs/components/**', statusCode: 301 }, prerender: false },
    // '/composables/**': { redirect: { to: '/docs/composables/**', statusCode: 301 }, prerender: false },
    // // v4 redirects - default root pages
    // '/docs': { redirect: '/docs/getting-started', prerender: false },
    // '/docs/composables': { redirect: '/docs/composables/define-shortcuts', prerender: false },
  },
});
