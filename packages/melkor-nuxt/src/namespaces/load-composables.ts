import type { MelkorNuxtContext } from '../types';
import { addImports, addImportsSources } from '@nuxt/kit';

export function loadComposables<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext): void {
  type ComposablesExports = (keyof typeof import('@skgn/melkor/composables'))[];

  for (const composable of Object.keys(ctx.schema.composables)) {
    addImports({
      name: composable,
      from: `@skgn/melkor/composables`,
    });
  }

  addImportsSources({
    from: '@skgn/melkor/composables',
    imports: [
      'createInputModel',
      'validateInputModel',
    ] as ComposablesExports,
  });
}
