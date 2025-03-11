<template>
  <!-- <AppThemeContext> -->
  <TheGlobalTheme v-slot="{ theme }">
    <AppThemeContext :value="theme.value" :preference="theme.preference">
      <div v-theme="theme" class="mk-TheApp" v-bind="$attrs">
        <slot />
        <!-- <teleport to="body">
          <TheFloatingLayer />
        </teleport>
        <teleport to="body">
          <TheFullscreenLayer />
        </teleport> -->
      </div>
    </AppThemeContext>
  </TheGlobalTheme>
</template>

<script lang="ts" setup>
import AppThemeContext from '../../components/AppThemeContext/AppThemeContext.vue';
import TheGlobalTheme from '../../components/TheGlobalTheme/TheGlobalTheme.vue';
</script>

<style lang="scss">
body[data-is-fullscreen-layer-active='true'] {
  .mk-TheApp {
    filter: blur(1px);
  }
}
</style>
