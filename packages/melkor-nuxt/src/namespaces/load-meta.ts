import type { MelkorNuxtContext } from '../module';

import { resolvePath } from '@nuxt/kit';

export async function loadMeta<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext) {
  ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/meta`] = await resolvePath(`@skgn/melkor/meta.json`);
}
