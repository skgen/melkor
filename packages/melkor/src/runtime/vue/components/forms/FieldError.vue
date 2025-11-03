<template>
  <div
    v-theme="theme"
    class="mk-FieldError"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { Slot } from 'vue';

export type FieldErrorSlots = {
  default?: Slot;
};
</script>

<script lang="ts" setup>
import { useTheme } from '../../composables';

defineSlots<FieldErrorSlots>();

const theme = useTheme();
</script>

<style lang="scss">
.mk-FieldError {
  --mk-field-error-text-color: var(--mk-error);
  --mk-field-error-text-size: 0.75rem;

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-1);
  align-items: center;
  font-size: var(--mk-field-error-text-size);
  color: var(--mk-field-error-text-color);
  white-space: pre-line;
}
</style>
