<template>
  <div class="sk-AppNavigationLevel" :data-has-children="hasChildren" :data-depth="props.depth ?? 0">
    <NuxtLink
      v-if="props.navigationLevel.path"
      :to="props.navigationLevel.path"
      class="sk-AppNavigationLevel-label"
      :data-has-children="hasChildren"
    >
      {{ props.navigationLevel.label }}
    </NuxtLink>
    <span
      v-else class="sk-AppNavigationLevel-label"
      :data-has-children="hasChildren"
    >
      {{ props.navigationLevel.label }}
    </span>

    <ul v-if="props.navigationLevel.children" class="sk-AppNavigationLevel-children">
      <li v-for="(childNavigationLevel, index) of props.navigationLevel.children" :key="index">
        <AppNavigationLevel :navigation-level="childNavigationLevel" :depth="props.depth ? props.depth + 1 : undefined" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { NavigationLevel } from '@/lib/static-data';

interface Props {
  navigationLevel: NavigationLevel;
  depth?: number;
}

const props = defineProps<Props>();

const hasChildren = computed(() => props.navigationLevel.children && props.navigationLevel.children?.length > 0);
</script>

<style lang="scss">
.sk-AppNavigationLevel {
  &-label {
    display: block;
    padding: var(--mk-size-2);

    &[data-has-children='true'] {
      font-weight: 600;
    }

    &:is(a) {
      transition: background-color var(--mk-transition-color-duration);

      &:hover {
        background-color: var(--mk-shade-4);
        border-radius: var(--mk-border-radius-size);
      }
    }

    &-::first-letter {
      text-transform: uppercase;
    }
  }

  &-children {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-1);
    padding: 0 0 0 var(--mk-size-2);
  }

  &-label + &-children {
    margin-top: var(--mk-size-1);
  }
}
</style>
