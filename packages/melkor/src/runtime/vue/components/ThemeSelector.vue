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
import type { InputSelectSlots } from '#melkor/components/forms/InputSelect.vue';

export type ThemeSelectorValue = string | null;

export type ThemeSelectorSlot = Pick<InputSelectSlots<ThemeSelectorValue>, 'option' | 'value'>;
</script>

<script lang="ts" setup>
import type { InputSelectProps } from '#melkor/components/forms/InputSelect.vue';

import { computed, onBeforeUnmount, onMounted, ref, watch, type WatchHandle } from 'vue';

import InputSelect from '#melkor/components/forms/InputSelect.vue';
import { useGlobalTheme, useThemes } from '#melkor/composables';

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
