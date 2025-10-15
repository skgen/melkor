<template>
  <div
    v-theme="theme"
    class="mk-Environment"
  >
    <slot>Vue</slot> <small>{{ props.label }}</small>
  </div>
</template>

<script lang="ts">
import type { InferDefaults } from '../features';

export type EnvironmentProps = {
  label?: string;
};

export const environmentDefaultProps = {
  label: 'env',
} satisfies InferDefaults<EnvironmentProps>;
</script>

<script lang="ts" setup>
import { useTheme } from '../composables';

const props = withDefaults(
  defineProps<EnvironmentProps>(),
  environmentDefaultProps,
);

const theme = useTheme();
</script>

<style lang="scss">
.mk-Environment {
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
}
</style>
