<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Components
    </template>
    <div class="sk-ComponentsView">
      <NuxtLink v-for="component of list" :key="component.path" :to="component.path">
        <AppCard class="">
          <AppStack justify="space-between" align="center">
            {{ component.label }}
            <AppIcon icon="material-symbols:arrow-forward-ios" />
          </AppStack>
        </AppCard>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { components } from '~/lib/components';

const list = Object.keys(components).map(k => components[k as keyof typeof components]);
useHead(({
  title: 'Melkor - Components',
}));
</script>

<style lang="scss">
@use '#melkor/styles/mixins' as melkor;

.sk-ComponentsView {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: var(--mk-size-4);

  .mk-AppCard {
    .mk-AppIcon {
      opacity: 0;
      transition:
        transform var(--mk-transition-2-duration),
        opacity var(--mk-transition-2-duration);
      transform: translateX(-5px);
    }

    @include melkor.on-hover {
      .mk-AppIcon {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
