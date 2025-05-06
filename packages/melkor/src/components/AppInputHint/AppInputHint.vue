<template>
  <span
    v-theme="theme"
    class="mk-AppInputHint"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables/useTheme';

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppInputHint {
  --mk-input-hint-text-color: var(--mk-text-soft-color);
  --mk-input-hint-text-size: 0.75rem;

  display: inline-flex;
  gap: var(--mk-size-1);
  align-items: center;
  font-size: var(--mk-input-hint-text-size);
  color: var(--mk-input-hint-text-color);
  white-space: pre-line;
}
</style>
