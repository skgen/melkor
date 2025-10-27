import type { ComputedRef } from 'vue';

import type { IconCollection, IconCollectionName } from '#melkor/features';

import { isValue } from '@skgn/kit';
import { useAsyncState } from '@vueuse/core';
import { computed, inject } from 'vue';

import { globalIconsContextKey } from '#melkor/features';

export interface UseIconCollectionOptions {
  collectionName: IconCollectionName;
}

export function useIconCollection(options: UseIconCollectionOptions): {
  collection: ComputedRef<IconCollection | null>;
} {
  const context = inject(globalIconsContextKey);

  if (!isValue(context)) {
    throw new Error('useIconCollection must be called inside an App which provides globalIconsContextKey');
  }

  const { state } = useAsyncState(
    context.loadCollection(options.collectionName),
    null,
  );

  return {
    collection: computed(() => state.value),
  };
}
