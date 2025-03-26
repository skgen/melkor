<template>
  <div class="sk-TheAsideNavigation">
    <ul class="sk-TheAsideNavigation-list">
      <li>
        <AppNavigationLevel
          v-for="(navigationLevel, index) of asideNavigation"
          :key="index"
          :navigation-level="navigationLevel"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { asideNavigation } from '~/lib/static-data';
</script>

<style lang="scss" scoped>
.sk-TheAsideNavigation {
  padding: var(--mk-size-8) var(--mk-size-4) var(--mk-size-8) 0;

  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-4);
  }
}
</style>
