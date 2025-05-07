import type { MelkorNuxtContext } from '../module';

import { addImportsSources, resolvePath } from '@nuxt/kit';

export async function loadComposables<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext) {
  const melkorComposables = await import('@skgn/melkor/composables');

  const composables = Object.keys(melkorComposables).filter((k) => {
    return !['default'].includes(k);
  });

  ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/composables`] = await resolvePath(`@skgn/melkor/composables`);

  addImportsSources({
    from: await resolvePath(`@skgn/melkor/composables`),
    imports: composables,
  });
}
