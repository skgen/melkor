import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { cyan } from 'colorette';

import { log } from './logger';

export function buildSchema(bundleKeys: string[]) {
  const melkorSchema = bundleKeys
    .filter((k) => {
      if (k.startsWith('node_modules')) {
        return false;
      }
      if (k.endsWith('.css')) {
        return false;
      }
      return true;
    })
    .reduce((acc, key) => {
      const parsed = key.split(path.sep);
      const namespace = parsed.find((v, i) => i === 0);
      const _name = parsed.find((v, i) => i === parsed.length - 1);
      if (!_name || !namespace) {
        return acc;
      }
      const name = _name.replace('.js', '');
      if (!Object.keys(acc).includes(namespace) || name === 'index') {
        return acc;
      }
      acc[namespace as keyof typeof acc][name] = key;

      return acc;
    }, <{
      components: Record<string, string>;
      composables: Record<string, string>;
    }>{
      components: {},
      composables: {},
    });

  const libPath = fileURLToPath(new URL('../lib', import.meta.url));
  if (!existsSync(libPath)) {
    mkdirSync(libPath);
  }
  const schemaPath = path.resolve(libPath, 'schema.json');
  if (existsSync(schemaPath)) {
    rmSync(schemaPath);
  }
  writeFileSync(schemaPath, `${JSON.stringify(melkorSchema, null, 2)}\n`, { encoding: 'utf-8' });

  log(`Schema updated at ${cyan(schemaPath)}`);
}
