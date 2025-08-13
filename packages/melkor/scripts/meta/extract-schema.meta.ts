import path from 'node:path';

export function extractSchema(bundleKeys: string[]) {
  return bundleKeys
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
}
