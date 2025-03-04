<template>
  <span
    v-theme="theme"
    class="mk-AppInputHint"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppInputHint {
  --mk-input-hint-text-color: var(--mk-text-soft-color);
  --mk-input-hint-text-size: 0.75rem;

  font-size: var(--mk-input-hint-text-size);
  color: var(--mk-input-hint-text-color);
  white-space: pre-line;
}
</style>
