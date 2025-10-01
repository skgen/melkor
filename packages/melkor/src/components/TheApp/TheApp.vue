<template>
  <AppThemeContext :value="theme.value" :preference="theme.preference">
    <TheTooltipProvider>
      <TheToastProvider>
        <div v-theme="theme" class="mk-TheApp" v-bind="$attrs">
          <slot />
          <TheFloatingLayer />
        </div>
      </TheToastProvider>
    </TheTooltipProvider>
  </AppThemeContext>
</template>

<script lang="ts" setup>
import { useInitGlobalTheme } from '../../composables/internal/useInitGlobalTheme';
import { useProvideIcons } from '../../composables/internal/useProvideIcons';
import AppThemeContext from '../AppThemeContext/AppThemeContext.vue';
import TheFloatingLayer from '../TheFloatingLayer/TheFloatingLayer.vue';
import TheToastProvider from '../TheToastProvider/TheToastProvider.vue';
import TheTooltipProvider from '../TheTooltipProvider/TheTooltipProvider.vue';

const { theme } = useInitGlobalTheme();
useProvideIcons();
</script>

<!-- <style lang="scss">
body[data-is-fullscreen-layer-active='true'] {
  .mk-TheApp {
    filter: blur(1px);
  }
}
</style> -->
