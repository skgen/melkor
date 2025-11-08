<template>
  <div
    v-theme="theme"
    class="mk-Skeleton"
    :data-shape="props.shape"
    :data-type="props.type"
    :data-density="props.density"
    :style="{
      '--computed-width': width,
      '--computed-height': height,
    }"
  />
</template>

<script lang="ts">
export type SkeletonProps = {
  width?: string;
  height?: string;
  size?: string;
  type?: 'loading' | 'placeholder';
  shape?: 'quadrilateral' | 'circle';
  density?: 'low' | 'high';
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';

import { useTheme } from '../composables';

const props = withDefaults(
  defineProps<SkeletonProps>(),
  {
    circle: false,
    type: 'loading',
    shape: 'quadrilateral',
    density: 'high',
  },
);

const defaultSize = '100%';

const theme = useTheme();

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
@use '../styles/mixins' as melkor;

.mk-Skeleton {
  --mk-skeleton-quadrilateral-border-radius: var(--mk-border-radius-size);
  --mk-skeleton-loading-background-color: var(--mk-shade-1);
  --mk-skeleton-loading-animation-background-color: var(--mk-shade-4);
  --mk-skeleton-placeholder-line-color: var(--mk-border-color);
  --mk-skeleton-placeholder-line-size: 1.5px;
  --mk-skeleton-placeholder-low-line-offset-multiplier: 4;
  --mk-skeleton-placeholder-high-line-offset-multiplier: 2;

  position: relative;
  width: var(--computed-width);
  height: var(--computed-height);


  &[data-shape='circle'] {
    border-radius: 50%;
  }

  &[data-shape='quadrilateral'] {
    border-radius: var(--mk-skeleton-quadrilateral-border-radius);
  }

  &[data-type='loading'] {
  overflow: hidden;
    background-color: var(--mk-skeleton-loading-background-color);

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 400%;
      height: 100%;
      content: '';
      background: linear-gradient(
        110deg,
        transparent,
        oklch(from var(--mk-skeleton-loading-animation-background-color) l c h / 40%),
        oklch(from var(--mk-skeleton-loading-animation-background-color) l c h / 60%),
        oklch(from var(--mk-skeleton-loading-animation-background-color) l c h / 40%),
        transparent,
      );
      transform: translate(-100%, 0);
      animation-name: loading-animation;

      // 1/3 = animation, 2/3 = pause
      animation-duration: calc(512ms + 1024ms);
      animation-timing-function: ease-in-out;
      animation-delay: 512ms;
      animation-iteration-count: infinite;
    }

    // 1/3 = animation, 2/3 = pause
    @keyframes loading-animation {
      0% {
        transform: translate(-100%, 0)
      }

      33% {
        transform: translate(25%, 0)
      }
      
      100% {
        transform: translate(25%, 0)
      }
    }
  }

  &[data-type='placeholder'] {
    overflow: hidden;
    border: var(--mk-skeleton-placeholder-line-size) solid var(--mk-skeleton-placeholder-line-color);

    &[data-density='high'] {
      --computed-offset-line-offset-size: calc(
        var(--mk-skeleton-placeholder-line-size) * var(--mk-skeleton-placeholder-high-line-offset-multiplier)
      );
    }

    &[data-density='low'] {
      --computed-offset-line-offset-size: calc(
        var(--mk-skeleton-placeholder-line-size) * var(--mk-skeleton-placeholder-low-line-offset-multiplier)
      );
    }

    &::before {
      position: absolute;
      inset: 0;
      content: '';
      background: repeating-linear-gradient(
        135deg,
        transparent,
        transparent var(--computed-offset-line-offset-size),
        var(--mk-skeleton-placeholder-line-color) var(--computed-offset-line-offset-size),
        var(--mk-skeleton-placeholder-line-color)
          calc(var(--computed-offset-line-offset-size) + var(--mk-skeleton-placeholder-line-size))
      );
    }
  }
}
</style>
