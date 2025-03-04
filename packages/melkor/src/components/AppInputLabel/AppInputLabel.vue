<template>
  <span
    v-theme="theme"
    class="mk-AppInputLabel"
    :data-theme="theme"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppInputLabel {
  font-weight: 500;
}
</style>
