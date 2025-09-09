import type { MelkorNuxtContext } from '../module';

import { addComponent, resolvePath } from '@nuxt/kit';

export async function loadComponents<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext) {
  for (const component of ctx.meta.schema.components) {
    const filePath = await resolvePath(`@skgn/melkor/components/${component.name}`);

    const name = ctx.moduleOptions?.prefix?.components
      ? component.name.replace(/(App)(\w+)/g, `${ctx.moduleOptions?.prefix?.components}$2`)
      : component.name;

    ctx.nuxt.options.alias[`${ctx.moduleOptions.namespace}/components/${name}`] = await resolvePath(`@skgn/melkor/components/${name}`);

    addComponent({
      name,
      filePath,
    });
  }
}
