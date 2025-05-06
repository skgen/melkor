import { addImportsSources } from '@nuxt/kit';
import * as melkorComposables from '@skgn/melkor/composables';

export function loadComposables(): void {
  const composables = Object.keys(melkorComposables).filter((k) => {
    return !['default'].includes(k);
  });

  addImportsSources({
    from: '@skgn/melkor/composables',
    imports: composables,
  });
}
