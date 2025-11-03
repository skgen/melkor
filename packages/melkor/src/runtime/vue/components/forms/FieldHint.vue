<template>
  <span
    v-theme="theme"
    class="mk-FieldHint"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import type { Slot } from 'vue';

export type FieldHintSlots = {
  default?: Slot;
};
</script>

<script lang="ts" setup>
import { useTheme } from '../../composables';

defineSlots<FieldHintSlots>();

const theme = useTheme();
</script>

<style lang="scss">
.mk-FieldHint {
  --mk-field-hint-text-color: var(--mk-text-soft-color);
  --mk-field-hint-text-size: 0.75rem;

  display: inline-flex;
  gap: var(--mk-size-1);
  align-items: center;
  font-size: var(--mk-field-hint-text-size);
  color: var(--mk-field-hint-text-color);
  white-space: pre-line;
}
</style>
