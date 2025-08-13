import { createRequire } from 'node:module';

export const meta = createRequire(import.meta.url)('@skgn/melkor/meta.json');
