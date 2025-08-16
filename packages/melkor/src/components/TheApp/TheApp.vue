<template>
  <!-- <AppThemeContext> -->
  <TheGlobalTheme v-slot="{ theme }">
    <AppThemeContext :value="theme.value" :preference="theme.preference">
      <TheIconsContext>
        <div v-theme="theme" class="mk-TheApp" v-bind="$attrs">
          <slot />
        </div>
      </TheIconsContext>x
    </AppThemeContext>
  </TheGlobalTheme>
</template>

<script lang="ts" setup>
import AppThemeContext from '../../components/AppThemeContext/AppThemeContext.vue';
import TheGlobalTheme from '../../components/TheGlobalTheme/TheGlobalTheme.vue';
import TheIconsContext from '../../components/TheIconsContext/TheIconsContext.vue';
</script>

<!-- <style lang="scss">
body[data-is-fullscreen-layer-active='true'] {
  .mk-TheApp {
    filter: blur(1px);
  }
}
</style> -->
