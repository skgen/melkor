<template>
  <TooltipProvider v-bind="rekaProviderProps">
    <slot />
  </TooltipProvider>
</template>

<script setup lang="ts">
import { TooltipProvider } from 'reka-ui';
import { computed } from 'vue';

import { useGlobalConfig } from '../../composables';

const config = useGlobalConfig();

const rekaProviderProps = computed(() => ({
  delayDuration: config.tooltip.delayDuration,
  disableClosingTrigger: config.tooltip.disableClosingTrigger,
  disableHoverableContent: config.tooltip.disableHoverableContent,
  ignoreNonKeyboardFocus: config.tooltip.ignoreNonKeyboardFocus,
  skipDelayDuration: config.tooltip.skipDelayDuration,
}));
</script>
