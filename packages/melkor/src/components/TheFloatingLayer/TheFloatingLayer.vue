<template>
  <div
    :id="floatingLayerId"
    v-theme="theme"
    class="mk-TheFloatingLayer"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';
import { floatingLayerId } from '../../features/layer';

const theme = useTheme();
</script>

<style lang="scss">
.mk-TheFloatingLayer {
  position: relative;

  // [data-reka-popper-content-wrapper] {
  //   z-index: var(--mk-floating-layer-z-index);
  // }
}
</style>
