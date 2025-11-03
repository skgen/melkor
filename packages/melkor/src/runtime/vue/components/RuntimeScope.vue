<template>
  <div
    v-theme="theme"
    class="mk-RuntimeScope"
  >
    <div class="mk-RuntimeScope-row">
      <code><slot name="raw">Vue</slot> as {{ runtimeScope.raw }}</code>
      <small>{{ props.raw }}</small>
    </div>
    <div class="mk-RuntimeScope-row">
      <code>{{ runtimeScope.reference }}</code>
      <small>{{ props.reference }}</small>
    </div>
  </div>
</template>

<script lang="ts">
export type RuntimeScopeProps = {
  raw?: string;
  reference?: string;
};

export type RuntimeScopeSlots = {
  raw?: Slot;
};
</script>

<script lang="ts" setup>
import type { Slot } from 'vue';

import { useRuntimeScope, useTheme } from '../composables';

const props = withDefaults(
  defineProps<RuntimeScopeProps>(),
  {
    raw: 'pure#Vue',
    reference: 'ref#Vue',
  },
);

defineSlots<RuntimeScopeSlots>();

const theme = useTheme();

const runtimeScope = useRuntimeScope();
</script>

<style lang="scss">
.mk-RuntimeScope {
  padding: var(--mk-size-2);
  font-size: 1.5rem;
  text-transform: uppercase;
  background-image: repeating-linear-gradient(
    135deg,
    transparent,
    transparent var(--mk-size-1),
    var(--mk-primary-15) var(--mk-size-1),
    var(--mk-primary-15) var(--mk-size-2)
  );

  &-row {
    display: flex;
    gap: var(--mk-size-2);
    align-items: center;
  }
}
</style>
