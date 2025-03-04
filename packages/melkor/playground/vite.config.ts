import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const port = 3001;

  return defineConfig({
    server: {
      port,
    },
    build: {
      minify: false,
      rollupOptions: {
        output: [
          {
            assetFileNames: 'assets/[name]-[hash][extname]',
          },
        ],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      vue(),
    ],
    resolve: {
      alias: [
        {
          find: /~(.+)/,
          replacement: fileURLToPath(new URL('./node_modules/$i', import.meta.url)),
        },
        {
          find: /@\//,
          replacement: fileURLToPath(new URL('./src/', import.meta.url)),
        },
        // ...Object.keys(libPkgExports).map(key => ({
        //   find: key,
        //   replacement: libPkgExports[key],
        // })),
      ],
    },
  });
};
