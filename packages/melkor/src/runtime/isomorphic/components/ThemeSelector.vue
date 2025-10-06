<template>
  <InputSelect
    :value="themeValue"
    class="mk-AppThemeSelector"
    :options="options"
    @update:value="(newValue) => themeValue = newValue"
  >
    <template #value="{ value }">
      <slot name="value" v-bind="{ value }">
        {{ value }}
      </slot>
    </template>
    <template #option="{ index, option }">
      <slot name="option" v-bind="{ index, option }">
        {{ option.value }}
      </slot>
    </template>
  </InputSelect>
</template>

<script lang="ts">
import type { InputSelectSlots } from './forms/InputSelect.vue';
export type ThemeSelectorValue = string | null;

export type ThemeSelectorSlot = Pick<InputSelectSlots<ThemeSelectorValue>, 'option' | 'value'>;
</script>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, type WatchHandle } from 'vue';

import { useGlobalTheme } from '../composables';
import { useThemes } from '../composables/useThemes';
import type { InputSelectProps } from './forms/InputSelect.vue';
import InputSelect from './forms/InputSelect.vue';

defineSlots<ThemeSelectorSlot>();

const globalTheme = useGlobalTheme();

const themes = useThemes();

const watchers: WatchHandle[] = [];

const options = computed<InputSelectProps<ThemeSelectorValue>['options']>(() => themes.map(theme => ({
  label: theme,
  value: theme,
})));

const themeValue = ref<ThemeSelectorValue>(null);

onMounted(() => {
  watchers.push(
    watch(themeValue, (newValue) => {
      if (newValue !== globalTheme.value.preference && newValue) {
        globalTheme.value.preference = newValue;
      }
    }),
  );

  watchers.push(
    watch(() => globalTheme.value.preference, (newPreference) => {
      if (newPreference !== themeValue.value) {
        themeValue.value = newPreference;
      }
    }, {
      immediate: true,
    }),
  );
});

onBeforeUnmount(() => {
  for (const stopWatch of watchers) {
    stopWatch();
  }
});
</script>
