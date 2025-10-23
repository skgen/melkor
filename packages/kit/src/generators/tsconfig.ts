import type { TsConfigJson } from 'type-fest';

import type { ExportedComponents } from '../resolvers/components';
import type { WriteableFile } from '../utils';

import fs from 'fs-extra';
import path from 'pathe';

import { resolveNuxtComponents, resolveVueComponents } from '../resolvers/components';
import { resolveNuxtComposablesIndex, resolveVueComposablesIndex } from '../resolvers/composables';
import { resolveNuxtFeaturesIndex, resolveVueFeaturesIndex } from '../resolvers/features';
import { createGeneratedResolver, createRuntimeResolver, relativePath, vNamespace } from '../utils';

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

async function transformNuxtAutomaticTsConfig(cwd: string, writeDir: string, paths?: Record<string, string[]>): Promise<TsConfigJson> {
  const nuxtTsConfigPath = path.resolve(cwd, '.nuxt/tsconfig.app.json');
  const nuxtTsConfigFile: TsConfigJson = JSON.parse(await fs.readFile(nuxtTsConfigPath, { encoding: 'utf-8' }));
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

export async function generateNuxtTsConfigFile(cwd: string): Promise<WriteableFile> {
  const srcDir = path.resolve(cwd, 'src');
  const runtimeResolver = createRuntimeResolver(srcDir);
  const generatedResolver = createGeneratedResolver(cwd);

  const [components, composables, features] = await Promise.all([
    resolveNuxtComponents({
      resolver: runtimeResolver,
    }),
    resolveNuxtComposablesIndex({
      resolver: runtimeResolver,
    }),
    resolveNuxtFeaturesIndex({
      resolver: runtimeResolver,
    }),
  ]);

  const paths = resolvePathsFromDir(
    new Map([
      ...components.entries().map(([key, v]) => [`components:${key}`, v] as const),
      ...composables.entries().map(([key, v]) => [`composables:${key}`, v] as const),
      ...features.entries().map(([key, v]) => [`features:${key}`, v] as const),
    ]),
    generatedResolver.dir,
  );

  const nuxtTsConfig = await transformNuxtAutomaticTsConfig(cwd, generatedResolver.dir, paths);

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

  return {
    filePath: generatedResolver.nuxtTsConfigPath,
    content: JSON.stringify(tsConfig, null, 2),
  };
}

export async function generateVueTsConfigFile(cwd: string): Promise<WriteableFile> {
  const srcDir = path.resolve(cwd, 'src');
  const runtimeResolver = createRuntimeResolver(srcDir);
  const generatedResolver = createGeneratedResolver(cwd);

  const [components, composables, features] = await Promise.all([
    resolveVueComponents({
      resolver: runtimeResolver,
    }),
    resolveVueComposablesIndex({
      resolver: runtimeResolver,
    }),
    resolveVueFeaturesIndex({
      resolver: runtimeResolver,
    }),
  ]);

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

  return {
    filePath: generatedResolver.vueTsConfigPath,
    content: JSON.stringify(tsConfig, null, 2),
  };
}

export async function generateTsConfigFiles(cwd: string): Promise<WriteableFile[]> {
  return (await Promise.all([
    generateVueTsConfigFile(cwd),
    generateNuxtTsConfigFile(cwd),
  ])).flat(1);
}
