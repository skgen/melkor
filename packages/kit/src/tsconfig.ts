import type { TsConfigJson } from 'type-fest';

import type { ExportedComponents } from './components';

import fs from 'fs-extra';
import path from 'pathe';

import { resolveNuxtComponents, resolveVueComponents } from './components';
import { resolveNuxtComposables, resolveVueComposables } from './composables';
import { resolveNuxtFeatures, resolveVueFeatures } from './features';
import { createGeneratedResolver, createRuntimeResolver, vNamespace } from './utils';

function createTsConfig(config: { paths: Record<string, string[]> }): TsConfigJson {
  return {
    compilerOptions: {
      target: 'esnext',
      jsx: 'preserve',
      jsxImportSource: 'vue',
      lib: [
        'ESNext',
        'dom',
        'dom.iterable',
      ],
      moduleDetection: 'force',
      useDefineForClassFields: true,
      baseUrl: '.',
      module: 'esnext',
      moduleResolution: 'bundler',
      paths: config.paths,
      resolveJsonModule: true,
      types: [],
      strict: true,
      noImplicitOverride: true,
      noImplicitThis: true,
      noUncheckedIndexedAccess: true,
      noEmit: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      verbatimModuleSyntax: true,
      skipLibCheck: true,
    },
  };
}

function resolvePathsFromDir(components: ExportedComponents, dir: string) {
  return components.values().reduce<Record<string, string[]>>((acc, component) => {
    acc[component.alias] = [
      relativePath(dir, component.filepath),
    ];

    return acc;
  }, {});
}

function relativePath(from: string, to: string) {
  const _path = path.relative(from, to);
  return _path.startsWith('.') ? _path : `.${path.sep}${_path}`;
}

function transformNuxtAutomaticTsConfig(cwd: string, writeDir: string, paths?: Record<string, string[]>) {
  const nuxtTsConfigPath = path.resolve(cwd, '.nuxt/tsconfig.app.json');
  const nuxtTsConfigFile: TsConfigJson = JSON.parse(fs.readFileSync(nuxtTsConfigPath, { encoding: 'utf-8' }));
  delete nuxtTsConfigFile.include;
  delete nuxtTsConfigFile.exclude;
  if (!nuxtTsConfigFile?.compilerOptions?.paths) {
    return nuxtTsConfigFile;
  }
  const oldPaths = nuxtTsConfigFile?.compilerOptions?.paths as Record<string, string[]>;
  const relativePaths = {} as Record<string, string[]>;
  for (const key of Object.keys(oldPaths)) {
    if (key.startsWith(vNamespace)) {
      continue;
    }
    relativePaths[key] = oldPaths[key].map((p) => {
      const absP = path.resolve(cwd, '.nuxt', p);
      return relativePath(writeDir, absP);
    });
  }
  nuxtTsConfigFile.compilerOptions.paths = {
    ...relativePaths,
    ...paths,
  };
  return nuxtTsConfigFile;
}

export function generateNuxtTsConfig(cwd: string): TsConfigJson {
  const srcDir = path.resolve(cwd, 'src');
  const runtimeResolver = createRuntimeResolver(srcDir);
  const generatedResolver = createGeneratedResolver(cwd);

  const components = resolveNuxtComponents({
    resolver: runtimeResolver,
  });

  const composables = resolveNuxtComposables({
    resolver: runtimeResolver,
  });

  const features = resolveNuxtFeatures({
    resolver: runtimeResolver,
  });

  const paths = resolvePathsFromDir(
    new Map([
      ...components.entries().map(([key, v]) => [`components:${key}`, v] as const),
      ...composables.entries().map(([key, v]) => [`composables:${key}`, v] as const),
      ...features.entries().map(([key, v]) => [`features:${key}`, v] as const),
    ]),
    generatedResolver.dir,
  );

  const nuxtTsConfig = transformNuxtAutomaticTsConfig(cwd, generatedResolver.dir, paths);

  const tsConfig: TsConfigJson = {
    ...nuxtTsConfig,
    include: [
      relativePath(generatedResolver.dir, path.resolve(cwd, '.nuxt/**/*')),
      relativePath(generatedResolver.dir, path.resolve(runtimeResolver.nuxtDir, './**/*.ts')),
      relativePath(generatedResolver.dir, path.resolve(runtimeResolver.nuxtDir, './**/*.vue')),
      // We also add vue dir because overrides sources are in vue dirs
      relativePath(generatedResolver.dir, path.resolve(runtimeResolver.vueDir, './**/*.ts')),
      relativePath(generatedResolver.dir, path.resolve(runtimeResolver.vueDir, './**/*.vue')),
    ],
  };

  return tsConfig;
}

export function generateVueTsConfig(cwd: string): TsConfigJson {
  const srcDir = path.resolve(cwd, 'src');
  const runtimeResolver = createRuntimeResolver(srcDir);
  const generatedResolver = createGeneratedResolver(cwd);

  const components = resolveVueComponents({
    resolver: runtimeResolver,
  });

  const composables = resolveVueComposables({
    resolver: runtimeResolver,
  });

  const features = resolveVueFeatures({
    resolver: runtimeResolver,
  });

  const paths = resolvePathsFromDir(
    new Map([
      ...components.entries().map(([key, v]) => [`components:${key}`, v] as const),
      ...composables.entries().map(([key, v]) => [`composables:${key}`, v] as const),
      ...features.entries().map(([key, v]) => [`features:${key}`, v] as const),
    ]),
    generatedResolver.dir,
  );

  const baseTsConfig = createTsConfig({
    paths,
  });

  const tsConfig: TsConfigJson = {
    ...baseTsConfig,
    include: [
      relativePath(generatedResolver.dir, path.resolve(runtimeResolver.vueDir, './**/*.ts')),
      relativePath(generatedResolver.dir, path.resolve(runtimeResolver.vueDir, './**/*.vue')),
    ],
  };

  return tsConfig;
}
