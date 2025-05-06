<template>
  <Icon
    v-theme="theme"
    class="mk-AppIcon"
    v-bind="props"
  />
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { useTheme } from '../../composables/useTheme';

export interface Props {
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

const props = defineProps<Props>();

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppIcon {
  --mk-icon-size: 1em;
  --mk-icon-color: currentcolor;

  display: inline-block;
  font-size: var(--mk-icon-size);
  color: var(--mk-icon-color);
}
</style>
