import fs from 'fs-extra';
import { globSync } from 'glob';
import MagicString from 'magic-string';
import path from 'pathe';
import { defineBuildConfig } from 'unbuild';

function resolveStyles(from: string, ...paths: string[]): string {
  return path.resolve(from, 'runtime/vue/styles', ...paths);
}

function stylesTask() {
  const srcStyles = resolveStyles(path.resolve(import.meta.dirname, 'src'));
  const distStyles = resolveStyles(path.resolve(import.meta.dirname, 'dist'));

  // Removes all css extra files
  globSync(path.resolve(distStyles, '**/*.css'), {
    ignore: [
      path.resolve(distStyles, '**/index.css'),
      path.resolve(distStyles, '**/normalize.css'),
    ],
  }).forEach(fs.removeSync);

  // Removes all empty directories
  globSync(path.resolve(distStyles, '**'), {
    ignore: [
      path.resolve(distStyles, '**/*.*'),
      distStyles,
    ],
  }).forEach((dir) => {
    const children = globSync(path.resolve(dir, '*'));
    if (children.length === 0) {
      fs.removeSync(dir);
    }
  });

  // Copy styles assets
  globSync(path.resolve(srcStyles, '**/*.scss'))
    .forEach(p => fs.copySync(p, p.replace('src', 'dist')));
}

// Assigning default props other than inline ends up messy with _mergeDefaults function assigned
function mergeDefaultTask() {
  const pattern = '/* @__PURE__ */ _mergeDefaults';
  globSync(path.resolve(import.meta.dirname, 'dist/runtime/**/*.vue')).forEach((p) => {
    const text = fs.readFileSync(p, { encoding: 'utf-8' });
    if (!text.includes(pattern)) {
      return;
    }
    const ms = new MagicString(text);
    ms.replace(/(<script setup>)/, '$0\nimport { _mergeDefaults } from "#melkor/stubs";');
    fs.writeFileSync(p, ms.toString());
  });
}

export default defineBuildConfig({
  entries: [
    // Vue support
    './src/unplugin',
    './src/vite',
  ],
  hooks: {
    'build:done': () => {
      stylesTask();
      mergeDefaultTask();
      // Build meta here
    },
  },
  externals: [
    'pathe',
  ],
  failOnWarn: false,
});
