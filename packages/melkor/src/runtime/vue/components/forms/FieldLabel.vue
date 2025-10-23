<template>
  <span
    v-theme="theme"
    class="mk-FieldLabel"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import type { Slot } from 'vue';

export type FieldLabelSlots = {
  default?: Slot;
};
</script>

<script lang="ts" setup>
import { useTheme } from '#melkor/composables';

defineSlots<FieldLabelSlots>();

const theme = useTheme();
</script>

<style lang="scss">
.mk-FieldLabel {
  --mk-field-label-text-size: 1rem;

  display: inline-flex;
  gap: var(--mk-size-1);
  align-items: center;
  font-size: var(--mk-field-label-text-size);
  font-weight: 500;
}
</style>
