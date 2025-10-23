<template>
  <div
    v-theme="theme"
    class="mk-Card"
    :data-type="surface.elevation"
  >
    <slot v-bind="surface" />
  </div>
</template>

<script lang="ts">
import type { SurfaceElevation } from '#melkor/features';

export interface CardProps {
  elevation?: SurfaceElevation;
}
</script>

<script lang="ts" setup>
import { useSurface, useTheme } from '#melkor/composables';

const props = defineProps<CardProps>();

const surface = useSurface({
  inject: true,
  override: {
    elevation: props.elevation,
  },
});

const theme = useTheme();
</script>

<style lang="scss">
.mk-Card {
  --mk-card-padding-size: var(--mk-size-4);
  --mk-card-border-size: var(--mk-border-size);
  --mk-card-border-color: var(--mk-surface-border-color);
  --mk-card-border-radius-size: var(--mk-border-radius-size);

  padding: var(--mk-card-padding-size);
  border: var(--mk-card-border-size) solid var(--mk-card-border-color);
  border-radius: var(--mk-card-border-radius-size);

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
