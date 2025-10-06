<template>
  <div
    v-theme="theme"
    class="mk-Environment"
  >
    Nuxt <small>env</small>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '../../isomorphic/composables';

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
