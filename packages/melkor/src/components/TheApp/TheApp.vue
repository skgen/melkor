<template>
  <!-- <AppThemeContext> -->
  <TheGlobalTheme v-slot="{ theme }">
    <AppThemeContext :value="theme.value" :preference="theme.preference">
      <TheIconsContext>
        <TheToastContext>
          <div v-theme="theme" class="mk-TheApp" v-bind="$attrs">
            <slot />
          </div>
        </TheToastContext>
      </TheIconsContext>
    </AppThemeContext>
  </TheGlobalTheme>
</template>

<script lang="ts" setup>
import AppThemeContext from '../AppThemeContext/AppThemeContext.vue';
import TheGlobalTheme from '../TheGlobalTheme/TheGlobalTheme.vue';
import TheIconsContext from '../TheIconsContext/TheIconsContext.vue';
import TheToastContext from '../TheToastContext/TheToastContext.vue';
</script>

<!-- <style lang="scss">
body[data-is-fullscreen-layer-active='true'] {
  .mk-TheApp {
    filter: blur(1px);
  }
}
</style> -->
