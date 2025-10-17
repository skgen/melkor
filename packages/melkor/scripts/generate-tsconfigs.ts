import { createGeneratedResolver, generateNuxtTsConfig, generateVueTsConfig, write } from '@skgn/melkor-kit';
import path from 'pathe';

export async function generateTsConfigs(rootPath: string) {
  const eslintConfigPath = path.resolve(rootPath, '../../eslint.config.mjs');

  const generatedResolver = createGeneratedResolver(rootPath);

  const nuxtTsConfig = generateNuxtTsConfig(rootPath);
  const vueTsConfig = generateVueTsConfig(rootPath);

  await write(generatedResolver.vueTsConfigPath, vueTsConfig, {
    eslintConfigPath,
  });

  await write(generatedResolver.nuxtTsConfigPath, nuxtTsConfig, {
    eslintConfigPath,
  });
}
