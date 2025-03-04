import { addImportsSources } from '@nuxt/kit';

export function loadFeatures(): void {
  type FeaturesExports = (keyof typeof import('@skgn/melkor/features'))[];

  addImportsSources({
    from: '@skgn/melkor/features',
    imports: [
      'Theme',
    ] as FeaturesExports,
  });
}
