<template>
  <slot v-if="!props.withNode" :theme="theme" v-bind="$attrs" />
  <div
    v-else
    v-theme="theme"
    class="mk-AppThemeContext"
    v-bind="$attrs"
  >
    <slot :theme="theme" />
  </div>
</template>

<script lang="ts" setup>
import type { ThemeInstance } from '../../features';
import { computed, provide } from 'vue';
import { useGlobalTheme, useThemes } from '../../composables';
import { getThemeValue, themeContextKey } from '../../features';

export interface Props {
  withNode?: boolean;
  preference?: string;
  value?: string;
}

const props = defineProps<Props>();

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
.mk-AppThemeContext {
  color: var(--mk-text-color);
  background-color: var(--mk-surface-low-background-color);
}
</style>
