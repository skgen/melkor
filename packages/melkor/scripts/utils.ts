import path from 'pathe';

export const rootPath = path.resolve(import.meta.dirname, '..');

export const eslintConfigPath = path.resolve(rootPath, '../../eslint.config.mjs');
