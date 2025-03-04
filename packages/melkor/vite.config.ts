import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { cyan, gray } from 'colorette';
import { globSync } from 'glob';
import { createLogger, defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { log } from './scripts/logger';
import { vitePluginBuildLib } from './scripts/vite-plugin-build-lib';
// import svgLoader from 'vite-svg-loader';

type Modes = 'lib' | 'esm' | 'lib-dev' | 'esm-dev';

let loggerBuffer = 0;
let loggerBufferTimeout: NodeJS.Timeout | null = null;

// https://vitejs.dev/config/
export default ({ mode }: { mode: Modes }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const viteLogger = createLogger();

  const isLib = (['lib', 'lib-dev'] as Modes[]).includes(mode);
  const isEsm = (['esm', 'esm-dev'] as Modes[]).includes(mode);
  // const isDev = (['lib-dev', 'esm-dev'] as Modes[]).includes(mode);
  const isBuild = (['lib', 'esm'] as Modes[]).includes(mode);

  // const isDevelopment = mode === 'development';

  const entry = isEsm
    ? [
        fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      ]
    : [
        fileURLToPath(new URL('./src/styles/index.scss', import.meta.url)),
        fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
        fileURLToPath(new URL('./src/composables/index.ts', import.meta.url)),
        fileURLToPath(new URL('./src/features/index.ts', import.meta.url)),
        fileURLToPath(new URL('./src/plugin.ts', import.meta.url)),
      ];

  return defineConfig({
    build: {
      outDir: isLib ? 'lib' : 'dist',
      // sourcemap: isDev,
      // sourcemap: false,
      lib: {
        formats: ['es'],
        entry,
        name: 'MelkorUI',
        fileName: () => {
          if (isEsm) {
            return 'melkor.esm.js';
          }
          return '[name].js';
        },
      },
      rollupOptions: {
        external: [
          'vue',
        ],
        output: isEsm
          ? {
              assetFileNames: (chunkInfo) => {
                const { name } = chunkInfo;
                if (/\.css$/.test(name ?? '')) {
                  return `melkor[extname]`;
                }

                return 'assets/[name][extname]';
              },
            }
          : undefined,

      },
      commonjsOptions: {
        esmExternals: true,
      },
      emptyOutDir: isBuild,
    },
    publicDir: false,
    plugins: [
      vue(),
      isLib
        ? vitePluginBuildLib({
            root: 'src',
            debug: true,
          })
        : null,
      dts({
        rollupTypes: isEsm,
        tsconfigPath: fileURLToPath(new URL('./tsconfig.app.json', import.meta.url)),
        outDir: fileURLToPath(new URL(isLib ? './lib' : './dist', import.meta.url)),
        beforeWriteFile: (filePath, content) => {
          let newfilePath = filePath.replace('/src', '');
          newfilePath = newfilePath.replace('.vue.d.ts', '.d.ts');
          const newContent = content.replace(/((export|import) ["'*./{} A-Za-z0-9]+ from ["'./A-Za-z0*9]+)(.vue)(["';]+)/g, `$1$4`);
          return {
            filePath: newfilePath,
            content: newContent,
          };
        },
      }),
      viteStaticCopy({
        targets: [
          ...(isLib
            ? [
                ...globSync(fileURLToPath(new URL('./src/styles/*', import.meta.url))),
              ]
            : [])
            .map(file => ({
              src: file,
              dest: 'styles',
            })),
          // {
          //   src: `./src/assets/i18n/*.json`,
          //   dest: 'i18n',
          // },
        ],
        watch: {
          options: {
            persistent: true,
          },
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src/', import.meta.url)),
        },
        // {
        //   find: '@components',
        //   replacement: fileURLToPath(new URL('./src/components/', import.meta.url)),
        // },
        // {
        //   find: '@styles',
        //   replacement: fileURLToPath(new URL('./src/styles/index.scss', import.meta.url)),
        // },
        // {
        //   find: '@features',
        //   replacement: fileURLToPath(new URL('./src/features/', import.meta.url)),
        // },
        // {
        //   find: '@types',
        //   replacement: fileURLToPath(new URL('./src/types/', import.meta.url)),
        // },
      ],
    },
    customLogger: {
      ...viteLogger,
      info(msg, options) {
        // N'affiche que les messages qui ne contiennent pas "transform"

        if (msg.includes('lib') && msg.includes('node_modules')) {
          loggerBuffer += 1;
          if (loggerBufferTimeout) {
            clearTimeout(loggerBufferTimeout);
          }
          loggerBufferTimeout = setTimeout(() => {
            log(`${loggerBuffer} ${gray(`lib/${cyan('node_modules/')}**`)} silently built`);
            loggerBuffer = 0;
          }, 500);
          return;
        }
        viteLogger.info(msg, options);
      },
    },
  });
};
