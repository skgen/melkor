import type { MelkorNuxtContext } from '../types';
import { addComponent } from '@nuxt/kit';

export function loadComponents<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext): void {
  // type ComponentsExports = (keyof typeof import('@skgn/melkor/components'))[];

  for (const component of Object.keys(ctx.schema.components)) {
    addComponent({
      name: component,
      filePath: `@skgn/melkor/components/${component}`,
    });
  }
}
