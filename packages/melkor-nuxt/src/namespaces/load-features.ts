import { addImportsSources } from '@nuxt/kit';
import * as melkorFeatures from '@skgn/melkor/features';

export function loadFeatures(): void {
  const features = Object.keys(melkorFeatures).filter((k) => {
    return !['default'].includes(k);
  });

  addImportsSources({
    from: '@skgn/melkor/features',
    imports: features,
  });

  // ctx.nuxt.options.alias['@skgn/melkor-nuxt/features'] = '@skgn/melkor/features';
}
