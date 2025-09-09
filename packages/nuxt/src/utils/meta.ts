import type Meta from '@skgn/melkor/meta.json';

import { createRequire } from 'node:module';

export const meta: typeof Meta = createRequire(import.meta.url)('@skgn/melkor/meta.json');
