<template>
  <div
    v-theme="theme"
    class="mk-AppInputError"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppInputError {
  --mk-input-error-text-color: var(--mk-error);
  --mk-input-error-text-size: 0.75rem;

  font-size: var(--mk-input-error-text-size);
  color: var(--mk-input-error-text-color);
  white-space: pre-line;
}
</style>
