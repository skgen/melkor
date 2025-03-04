<template>
  <div class="sk-TheAsideNavigation">
    <ul class="sk-TheAsideNavigation-list">
      <li class="sk-TheAsideNavigation-item">
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
import { asideNavigation } from '@/lib/static-data';
</script>

<style lang="scss">
.sk-TheAsideNavigation {
  padding: var(--mk-size-8) var(--mk-size-4) var(--mk-size-8) 0;

  &-item {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-4);
  }

  .sk-AppNavigationLevel {
    &-children {
      padding-left: 0;
    }
  }
}
</style>
