<template>
  <Icon
    v-theme="theme"
    class="mk-Icon"
    v-bind="props"
    :data-is-inline="props.inline || undefined"
  />
</template>

<script lang="ts">
export interface IconProps {
  icon: string;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  horizontalFlip?: string | number;
  verticalFlip?: boolean | number;
  flip?: string;
  rotate?: number;
  color?: string;
}
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { useTheme } from '../composables';

const props = defineProps<IconProps>();

const theme = useTheme();
</script>

<style lang="scss">
.mk-Icon {
  --mk-icon-size: 1em;
  --mk-icon-color: currentcolor;

  font-size: var(--mk-icon-size);
  color: var(--mk-icon-color);

  [data-is-inline='true'] {
    display: inline-block;
  }
}
</style>
