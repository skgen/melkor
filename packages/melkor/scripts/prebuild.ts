import {
  generateTsConfigFiles as _generateTsConfigFiles,
  log,
  write,
} from '@skgn/melkor-kit';
import { cyan, green } from 'colorette';

import { eslintConfigPath, rootPath } from './utils';

async function generateTsConfigFiles(rootPath: string) {
  const tsconfigFiles = await _generateTsConfigFiles(rootPath);

  const operations = tsconfigFiles.map((file) => {
    return write(file.filePath, file.content, { eslintConfigPath });
  });

  return Promise.all(operations);
}

log(`${cyan(`ℹ Prebuild starting...\n`)}`);

await generateTsConfigFiles(rootPath);

console.log();
log(`${green(`✔ Prebuild succeeded`)}`);
