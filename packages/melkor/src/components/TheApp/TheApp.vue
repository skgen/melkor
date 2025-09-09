<template>
  <!-- <AppThemeContext> -->
  <TheGlobalTheme v-slot="{ theme }">
    <AppThemeContext :value="theme.value" :preference="theme.preference">
      <TheIconsProvider>
        <TheTooltipProvider>
          <TheToastProvider>
            <div v-theme="theme" class="mk-TheApp" v-bind="$attrs">
              <slot />
              <TheFloatingLayer />
            </div>
          </TheToastProvider>
        </TheTooltipProvider>
      </TheIconsProvider>
    </AppThemeContext>
  </TheGlobalTheme>
</template>

<script lang="ts" setup>
import AppThemeContext from '../AppThemeContext/AppThemeContext.vue';
import TheFloatingLayer from '../TheFloatingLayer/TheFloatingLayer.vue';
import TheGlobalTheme from '../TheGlobalTheme/TheGlobalTheme.vue';
import TheIconsProvider from '../TheIconsProvider/TheIconsProvider.vue';
import TheToastProvider from '../TheToastProvider/TheToastProvider.vue';
import TheTooltipProvider from '../TheTooltipProvider/TheTooltipProvider.vue';
</script>

<!-- <style lang="scss">
body[data-is-fullscreen-layer-active='true'] {
  .mk-TheApp {
    filter: blur(1px);
  }
}
</style> -->
