<template>
  <AppInputSelect
    v-model="model"
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
import type { InputSelectOption } from '../../types';
import { computed, onBeforeUnmount, onMounted, ref, watch, type WatchHandle } from 'vue';
import AppInputSelect from '../../components/AppInputSelect/AppInputSelect.vue';
import { createInputModel, useGlobalTheme, useThemes } from '../../composables';

type InputSelectValue = string | null;

const globalTheme = useGlobalTheme();

const themes = useThemes();

const watchers: WatchHandle[] = [];

const options = computed<InputSelectOption<InputSelectValue>[]>(() => themes.map(theme => ({
  value: theme,
})));

const model = ref(createInputModel<InputSelectValue>({
  value: null,
}));

onMounted(() => {
  watchers.push(watch(() => model.value.value, (newValue) => {
    if (newValue !== globalTheme.value.preference && newValue) {
      globalTheme.value.preference = newValue;
    }
  }));

  watchers.push(watch(() => globalTheme.value.preference, (newPreference) => {
    if (newPreference !== model.value.value) {
      model.value.value = newPreference;
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
