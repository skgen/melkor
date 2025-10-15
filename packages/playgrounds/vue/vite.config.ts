import { melkor } from '@skgn/melkor/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    melkor(),
    // ui({
    //   ui: {
    //     colors: {
    //       primary: 'green',
    //       neutral: 'slate',
    //     },
    //   },
    //   autoImport: {
    //     dirs: ['../nuxt/app/composables'],
    //     imports: ['vue'],
    //   },
    //   components: {
    //     dirs: ['../nuxt/app/components'],
    //   },
    // }),
  ],
});
