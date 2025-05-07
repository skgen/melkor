import type { MelkorNuxtContext } from '../module';

import { addComponent, resolvePath } from '@nuxt/kit';

export async function loadComponents<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext) {
  for (const component of Object.keys(ctx.schema.components)) {
    const filePath = await resolvePath(`@skgn/melkor/components/${component}`);

    const name = ctx.moduleOptions?.prefix?.components
      ? component.replace(/(App)(\w+)/g, `${ctx.moduleOptions?.prefix?.components}$2`)
      : component;

    ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/components/${name}`] = await resolvePath(`@skgn/melkor/components/${name}`);

    addComponent({
      name,
      filePath,
    });
  }
}
