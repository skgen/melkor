import { addImportsSources } from '@nuxt/kit';

export function loadFeatures(): void {
  type FeaturesExports = (keyof typeof import('@skgn/melkor/features'))[];

  const features = [
    'Theme',
    'Shape',
  ] as FeaturesExports;

  addImportsSources({
    from: '@skgn/melkor/features',
    imports: features,
  });
}
