<template>
  <div
    v-theme="theme"
    class="mk-AppSkeleton"
    :data-shape="shape"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from '../../composables';
import { Shape } from '../../features';

interface Props {
  circle?: boolean;
  width?: string;
  height?: string;
  size?: string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    circle: false,
    width: undefined,
    height: undefined,
    size: undefined,
  },
);

const defaultSize = '100%';

const theme = useTheme();

const shape = computed(() => {
  if (props.circle) {
    return Shape.circle;
  }
  return Shape.rectangle;
});

const height = computed(() => {
  if (props.height) {
    return props.height;
  }
  if (props.size) {
    return props.size;
  }
  return defaultSize;
});

const width = computed(() => {
  if (props.width) {
    return props.width;
  }
  if (props.size) {
    return props.size;
  }
  return defaultSize;
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppSkeleton {
  --mk-skeleton-rectangle-border-radius: calc(var(--mk-border-radius-size) * 2);
  --mk-skeleton-background-color-hsl: var(--mk-shade-4-hsl);

  position: relative;
  width: v-bind('width');
  height: v-bind('height');
  background: hsl(var(--mk-skeleton-background-color-hsl));
  background: linear-gradient(
    to right,
    hsl(var(--mk-skeleton-background-color-hsl) / 80%) 8%,
    hsl(var(--mk-skeleton-background-color-hsl) / 90%) 18%,
    hsl(var(--mk-skeleton-background-color-hsl) / 80%) 33%
  );
  background-size: 3200px 400px;
  border-radius: var(--mk-skeleton-rectangle-border-radius);
  animation-name: skeleton-animation;
  animation-duration: 2000ms;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;

  &[data-shape='circle'] {
    border-radius: 50%;
  }

  @keyframes skeleton-animation {
    0% {
      background-position: -1600px 0;
    }

    100% {
      background-position: 1600px 0;
    }
  }
}
</style>
