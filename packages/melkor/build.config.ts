import fs from 'fs-extra';
import { globSync } from 'glob';
import MagicString from 'magic-string';
import path from 'pathe';
import { type BuildConfig, defineBuildConfig } from 'unbuild';

function resolveStyles(from: string, ...paths: string[]): string {
  return path.resolve(from, 'runtime/isomorphic/styles', ...paths);
}

function stylesTask() {
  const isoSrcStyles = resolveStyles(path.resolve(import.meta.dirname, 'src'));
  const isoDistStyles = resolveStyles(path.resolve(import.meta.dirname, 'dist'));

  // Removes all css extra files
  globSync(path.resolve(isoDistStyles, '**/*.css'), {
    ignore: [
      path.resolve(isoDistStyles, '**/index.css'),
      path.resolve(isoDistStyles, '**/normalize.css'),
    ],
  }).forEach(fs.removeSync);

  // Removes all empty directories
  globSync(path.resolve(isoDistStyles, '**'), {
    ignore: [
      path.resolve(isoDistStyles, '**/*.*'),
      isoDistStyles,
    ],
  }).forEach((dir) => {
    const children = globSync(path.resolve(dir, '*'));
    if (children.length === 0) {
      fs.removeSync(dir);
    }
  });

  // Copy styles assets
  globSync(path.resolve(isoSrcStyles, '**/*.scss'))
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
  hooks: {
    'build:done': () => {
      stylesTask();
      mergeDefaultTask();
    },
  },
});
