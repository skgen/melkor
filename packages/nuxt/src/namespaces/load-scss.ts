import type { MelkorNuxtContext } from '../module';

import { resolvePath } from '@nuxt/kit';

export async function loadScss<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext) {
  ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/styles/scss`] = await resolvePath(`@skgn/melkor/styles/scss`);
  ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/styles/mixins`] = await resolvePath(`@skgn/melkor/styles/mixins`);
}
