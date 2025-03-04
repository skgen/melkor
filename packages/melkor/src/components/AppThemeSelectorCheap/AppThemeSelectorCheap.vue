<template>
  <!-- <div
    v-theme="theme"
    class="mk-AppThemeSelector"
    :data-theme="getThemeValue(theme)"
  > -->
  <div
    v-theme="theme"
    class="mk-AppThemeSelectorCheap"
  >
    <template v-for="t of themes" :key="t">
      <AppButton type="outline" :data-is-active="t === currentTheme?.preference" @click="() => handleClick(t)">
        {{ `${t[0].toUpperCase()}${t.slice(1, t.length)}` }}
      </AppButton>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ThemeInstance } from '../../features';
import { onBeforeUnmount, onMounted, ref, watch, type WatchHandle } from 'vue';
import { useGlobalTheme, useTheme, useThemes } from '../../composables';
import AppButton from '../AppButton/AppButton.vue';

const themes = useThemes();
const theme = useTheme();
const globalTheme = useGlobalTheme();

const watchers: WatchHandle[] = [];

const currentTheme = ref<ThemeInstance | null>(null);

function handleClick(newTheme: string) {
  globalTheme.value.preference = newTheme;
}

onMounted(() => {
  currentTheme.value = globalTheme.value;
  watchers.push(watch(globalTheme, (newGlobalTheme) => {
    currentTheme.value = newGlobalTheme;
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

<style lang="scss">
.mk-AppThemeSelectorCheap {
  display: flex;
  gap: var(--mk-size-2);
  align-items: center;
  justify-content: center;
}
</style>
