import { generateNuxtTSConfig, generateVueTSConfig } from '@skgn/melkor-kit';
import path from 'pathe';

import { rootPath } from './utils';

const eslintConfigPath = path.resolve(rootPath, '../../eslint.config.mjs');

await generateNuxtTSConfig(rootPath, eslintConfigPath);
await generateVueTSConfig(rootPath, eslintConfigPath);
