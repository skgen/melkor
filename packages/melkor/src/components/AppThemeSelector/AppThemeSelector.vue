<template>
  <AppInputSelect
    :value="value"
    class="mk-AppThemeSelector"
    :options="options"
  >
    <template #option="{ option }">
      <!-- {{ $t(`melkor.theme.${option.value}`) }} -->
      {{ option.value }}
    </template>
  </AppInputSelect>
</template>

<script lang="ts" setup>
import type { InputSelectProps } from '../..';

import { computed, onBeforeUnmount, onMounted, ref, watch, type WatchHandle } from 'vue';

import { useGlobalTheme, useThemes } from '../..';
import AppInputSelect from '../../components/AppInputSelect/AppInputSelect.vue';

type InputSelectValue = string | null;

const globalTheme = useGlobalTheme();

const themes = useThemes();

const watchers: WatchHandle[] = [];

const options = computed<InputSelectProps<InputSelectValue>['options']>(() => themes.map(theme => ({
  label: theme,
  value: theme,
})));

const value = ref<InputSelectValue>(null);

onMounted(() => {
  watchers.push(watch(value, (newValue) => {
    if (newValue !== globalTheme.value.preference && newValue) {
      globalTheme.value.preference = newValue;
    }
  }));

  watchers.push(watch(() => globalTheme.value.preference, (newPreference) => {
    if (newPreference !== value.value) {
      value.value = newPreference;
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
</script>
