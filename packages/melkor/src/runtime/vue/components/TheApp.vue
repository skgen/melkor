<template>
  <ThemeContext :value="theme.value" :preference="theme.preference">
    <TheTooltipProvider>
      <TheToastProvider>
        <div v-theme="theme" class="mk-TheApp" v-bind="$attrs">
          <slot />
          <div :id="floatingLayerId" class="mk-TheApp-layer" />
        </div>
      </TheToastProvider>
    </TheTooltipProvider>
  </ThemeContext>
</template>

<script lang="ts" setup>
import TheToastProvider from '#melkor/components/internal/TheToastProvider.vue';
import TheTooltipProvider from '#melkor/components/internal/TheTooltipProvider.vue';
import ThemeContext from '#melkor/components/ThemeContext.vue';
import { useProvideGlobalTheme, useProvideIcons } from '#melkor/composables';
import { floatingLayerId } from '#melkor/features';

const { theme } = useProvideGlobalTheme();
useProvideIcons();
</script>

<!-- <style lang="scss">
body[data-is-fullscreen-layer-active='true'] {
  .mk-TheApp {
    filter: blur(1px);
  }
}
</style> -->

<style lang="scss">
.mk-TheApp {
  &-layer {
    position: relative;
  }
}
</style>
