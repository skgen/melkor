import type { Linter } from 'eslint';

import type { ExportedComponents } from './components';

import { ESLint } from 'eslint';
import fs from 'fs-extra';
import path from 'pathe';

// declare module '../../../eslint.config.mjs' {
//   const _: Linter.Config;
//   export default _;
// }
import { resolveNuxtComponents, resolveVueComponents } from './components';
import { resolveNuxtComposables, resolveVueComposables } from './composables';
import { resolveNuxtFeatures, resolveVueFeatures } from './features';
import { createGeneratedResolver, createRuntimeResolver, vNamespace } from './utils';

// type CreateTSConfigOptions = {
//   tsConfigPath: string;
//   components: ExportedComponents;
// };

async function lint(filepath: string, eslintConfigPath?: string, eslintConfig?: Linter.Config, iteration = 0) {
  let _eslintConfig = eslintConfig ?? null;
  if (!_eslintConfig) {
    const __eslintConfig = eslintConfigPath ? await import(eslintConfigPath) : null;
    _eslintConfig = __eslintConfig ? await __eslintConfig.default as Linter.Config : null;
  }

  const eslint = new ESLint({
    baseConfig: _eslintConfig,
    fix: true,
  });

  const results = await eslint.lintFiles(filepath);

  await ESLint.outputFixes(results);

  // Hack to correctly lint tsconfig for multiple paths
  if (iteration === 1) {
    return;
  }

  await lint(filepath, undefined, _eslintConfig ?? undefined, iteration + 1);
}

function createTSConfig(config: { paths: Record<string, string[]> }) {
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

// export function overrideTSConfigAlias(options: CreateTSConfigOptions) {
//   const tsconfigFile = JSON.parse(fs.readFileSync(options.tsConfigPath, { encoding: 'utf-8' }));
//   if (!tsconfigFile?.compilerOptions?.paths) {
//     return null;
//   }
//   let _paths = JSON.stringify(tsconfigFile?.compilerOptions?.paths);

//   function escape(str: string) {
//     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   }

//   for (const component of options.components.values()) {
//     const regex = new RegExp(`("${escape(component.alias)}":\\["[./\\w]+)(\/${escape(component.scopedPath)})("\\])`, 'g');
//     _paths = _paths.replaceAll(regex, (match, $0, _, $2) => `${$0}/${component.scopedFilepath}${$2}`);
//   }

//   tsconfigFile.compilerOptions.paths = JSON.parse(_paths);

//   return tsconfigFile as Record<string, any>;
// }

function transformNuxtAutomaticTSConfig(cwd: string, writeDir: string, paths?: Record<string, string[]>) {
  const nuxtTSConfigPath = path.resolve(cwd, '.nuxt/tsconfig.app.json');
  const nuxtTSConfigFile = JSON.parse(fs.readFileSync(nuxtTSConfigPath, { encoding: 'utf-8' }));
  delete nuxtTSConfigFile.include;
  delete nuxtTSConfigFile.exclude;
  if (!nuxtTSConfigFile?.compilerOptions?.paths) {
    return nuxtTSConfigFile;
  }
  const oldPaths = nuxtTSConfigFile?.compilerOptions?.paths as Record<string, string[]>;
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
  nuxtTSConfigFile.compilerOptions.paths = {
    ...relativePaths,
    ...paths,
  };
  return nuxtTSConfigFile;
}

// function overrideNuxtAutomaticTSConfig(srcDir: string) {
//   const rootDir = path.resolve(srcDir, '..');
//   const nuxtTSConfigPath = path.resolve(rootDir, '.nuxt/tsconfig.app.json');

//   const resolver = createRuntimeResolver(srcDir);

//   const nuxtComponents = resolveNuxtComponents({
//     resolver,
//   });

//   const newTSConfig = overrideTSConfigAlias({
//     tsConfigPath: nuxtTSConfigPath,
//     components: nuxtComponents,
//   });

//   fs.writeFileSync(
//     nuxtTSConfigPath,
//     JSON.stringify(newTSConfig, null, 2),
//     { encoding: 'utf-8' },
//   );
// }

export async function generateNuxtTSConfig(cwd: string, eslintConfigPath?: string) {
  const srcDir = path.resolve(cwd, 'src');
  const runtimeResolver = createRuntimeResolver(srcDir);
  const generatedResolver = createGeneratedResolver(srcDir);
  const dir = runtimeResolver.nuxtDir;

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

  const nuxtTsConfig = transformNuxtAutomaticTSConfig(cwd, generatedResolver.dir, paths);

  const tsConfig = {
    ...nuxtTsConfig,
    include: [
      relativePath(generatedResolver.dir, path.resolve(cwd, '.nuxt/**/*')),
      relativePath(generatedResolver.dir, path.resolve(dir, './**/*.ts')),
      relativePath(generatedResolver.dir, path.resolve(dir, './**/*.vue')),
    ],
  };

  fs.ensureDirSync(generatedResolver.dir);
  fs.writeFileSync(
    generatedResolver.nuxtTsConfigPath,
    JSON.stringify(tsConfig, null, 2),
    { encoding: 'utf-8' },
  );

  await lint(generatedResolver.nuxtTsConfigPath, eslintConfigPath);
}

export async function generateVueTSConfig(cwd: string, eslintConfigPath?: string) {
  const srcDir = path.resolve(cwd, 'src');
  const runtimeResolver = createRuntimeResolver(srcDir);
  const generatedResolver = createGeneratedResolver(srcDir);
  const dir = runtimeResolver.vueDir;

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

  const baseTsConfig = createTSConfig({
    paths,
  });

  const tsConfig = {
    ...baseTsConfig,
    include: [
      relativePath(generatedResolver.dir, path.resolve(dir, './**/*.ts')),
      relativePath(generatedResolver.dir, path.resolve(dir, './**/*.vue')),
    ],
  };

  fs.ensureDirSync(generatedResolver.dir);
  fs.writeFileSync(
    generatedResolver.vueTsConfigPath,
    `${JSON.stringify(tsConfig, null, 2)}\n`,
    { encoding: 'utf-8' },
  );

  await lint(generatedResolver.vueTsConfigPath, eslintConfigPath);
}
