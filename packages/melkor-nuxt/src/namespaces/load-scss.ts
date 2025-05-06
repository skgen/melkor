import type { MelkorNuxtContext } from '../types';

export function loadScss<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext): void {
  ctx.nuxt.options.alias['@skgn/melkor-nuxt/styles/mixins'] = ctx.resolver.resolve('runtime/mixins.scss');
  ctx.nuxt.options.alias['@skgn/melkor-nuxt/styles'] = ctx.resolver.resolve('runtime/index.scss');
}
