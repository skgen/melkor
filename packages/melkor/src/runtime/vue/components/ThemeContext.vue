<template>
  <slot v-if="!props.withNode" :theme="theme" v-bind="$attrs" />
  <div
    v-else
    v-theme="theme"
    class="mk-ThemeContext"
    v-bind="$attrs"
  >
    <slot :theme="theme" />
  </div>
</template>

<script lang="ts">
export type ThemeContextProps = {
  withNode?: boolean;
  preference?: string;
  value?: string;
};
</script>

<script lang="ts" setup>
import { computed, provide } from 'vue';

import { useGlobalTheme, useThemes } from '#melkor/composables';
import { getThemeValue, themeContextKey, type ThemeInstance } from '#melkor/features';

const props = defineProps<ThemeContextProps>();

const themes = useThemes();
const globalTheme = useGlobalTheme();

const preference = computed(() => props.preference ?? globalTheme.value.preference);
const value = computed(() => props.value ?? getThemeValue(preference.value, themes));

const theme = computed<ThemeInstance>(() => ({
  value: value.value,
  preference: preference.value,
}));

provide(themeContextKey, theme);
</script>

<style lang="scss">
.mk-ThemeContext {
  color: var(--mk-text-color);
  background-color: var(--mk-surface-low-background-color);
}
</style>
