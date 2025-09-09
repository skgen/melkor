import type { MelkorNuxtContext } from '../module';

import { addImportsSources, resolvePath } from '@nuxt/kit';

export async function loadFeatures<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext) {
  const melkorFeatures = await import('@skgn/melkor/features');

  const features = Object.keys(melkorFeatures).filter((k) => {
    return !['default'].includes(k);
  });

  ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/features`] = await resolvePath(`@skgn/melkor/features`);

  addImportsSources({
    from: await resolvePath(`@skgn/melkor/features`),
    imports: features,
  });
}
