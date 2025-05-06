<template>
  <span
    v-theme="theme"
    class="mk-AppInputLabel"
    :data-theme="theme"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables/useTheme';

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppInputLabel {
  display: inline-flex;
  gap: var(--mk-size-1);
  align-items: center;
  font-weight: 500;
}
</style>
