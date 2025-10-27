import type { Ref, ShallowRef, WatchHandle } from 'vue';

import { useCycleList } from '@vueuse/core';
import { onBeforeUnmount, onMounted, watch } from 'vue';

import { useGlobalConfig, useGlobalTheme } from '#melkor/composables';

export function useNextTheme(): {
  next: (n?: number) => string;
  index: Ref<number>;
  theme: ShallowRef<string>;
} {
  const globalTheme = useGlobalTheme();
  const globalConfig = useGlobalConfig();

  const { state: localTheme, next, index } = useCycleList(globalConfig.themes, {
    initialValue: globalTheme.value.preference,
  });

  const watchers: WatchHandle[] = [];

  onMounted(() => {
    watchers.push(watch(() => localTheme.value, (newLocalTheme) => {
      if (newLocalTheme !== globalTheme.value.preference) {
        globalTheme.value.preference = newLocalTheme;
      }
    }));

    watchers.push(watch(() => globalTheme.value.preference, (newPreference) => {
      if (newPreference !== localTheme.value) {
        localTheme.value = newPreference;
      }
    }, {
      immediate: true,
    }));
  });

  onBeforeUnmount(() => {
    for (const stopWatch of watchers) {
      stopWatch();
    }
  });

  return {
    next,
    index,
    theme: localTheme,
  };
}
