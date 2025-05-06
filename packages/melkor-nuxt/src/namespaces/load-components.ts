import type { MelkorNuxtContext } from '../types';

import { addComponent } from '@nuxt/kit';

export function loadComponents<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext): void {
  for (const component of Object.keys(ctx.schema.components)) {
    const name = ctx.moduleOptions?.prefix?.components
      ? component.replace(/(App)(\w+)/g, `${ctx.moduleOptions?.prefix?.components}$2`)
      : component;

    addComponent({
      name,
      filePath: `@skgn/melkor/components/${component}`,
    });
  }
}
