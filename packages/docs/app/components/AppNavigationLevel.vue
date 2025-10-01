<template>
  <div class="sk-AppNavigationLevel" :data-has-children="hasChildren" :data-depth="props.depth ?? 0">
    <NuxtLink
      v-if="props.navigationItem.path && props.navigationItem.page !== false"
      :to="props.navigationItem.path"
      class="sk-AppNavigationLevel-label"
      :data-has-children="hasChildren"
    >
      {{ props.navigationItem.title }}
    </NuxtLink>
    <span
      v-else class="sk-AppNavigationLevel-label"
      :data-has-children="hasChildren"
    >
      {{ props.navigationItem.title }}
    </span>

    <ul v-if="props.navigationItem.children" class="sk-AppNavigationLevel-children">
      <li v-for="(child) of props.navigationItem.children" :key="child.stem">
        <AppNavigationLevel :navigation-item="child" :depth="props.depth + 1" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  navigationItem: EnhancedContentNavigationItem;
  depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
});

const hasChildren = computed(() => props.navigationItem.children && props.navigationItem.children?.length > 0);
</script>

<style lang="scss">
@use '#melkor/styles/mixins' as melkor;

.sk-AppNavigationLevel {
  &-label {
    display: block;
    padding: var(--mk-size-2);

    &[data-has-children='true'] {
      font-weight: 600;
    }

    &:is(a) {
      transition: background-color var(--mk-transition-color-duration);

      /* stylelint-disable-next-line selector-class-pattern */
      &.router-link-active {
        background-color: var(--mk-shade-3);
        border-radius: var(--mk-border-radius-size);
      }

      @include melkor.on-hover {
        background-color: var(--mk-shade-3);
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
