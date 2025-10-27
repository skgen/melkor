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
import { ThemeContext, TheToastProvider, TheTooltipProvider } from '#melkor/components';
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
