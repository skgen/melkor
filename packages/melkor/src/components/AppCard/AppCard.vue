<template>
  <div
    v-theme="theme"
    class="mk-AppCard"
    :data-type="surface.elevation"
  >
    <pre>{{ surface }}</pre>
    <slot v-bind="surface" />
  </div>
</template>

<script lang="ts" setup>
import type { SurfaceElevation } from '../../features';
import { useSurface, useTheme } from '../../composables';

interface Props {
  elevation?: SurfaceElevation;
}

const props = defineProps<Props>();

const surface = useSurface({ override: {
  elevation: props.elevation,
} });

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppCard {
  padding: var(--mk-size-4);
  border: 1px solid var(--mk-surface-border-color);
  border-radius: var(--mk-border-radius-size);

  &[data-type='surface-low'] {
    background-color: var(--mk-surface-low-background-color);
  }

  &[data-type='surface'] {
    background-color: var(--mk-surface-background-color);
  }

  &[data-type='surface-high'] {
    background-color: var(--mk-surface-high-background-color);
  }
}
</style>
