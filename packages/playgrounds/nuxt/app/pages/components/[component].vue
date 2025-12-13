<template>
  <NuxtLayout name="default">
    <template #header-name>
      {{ normalizedComponentName }}
    </template>
    <template #header-props />
    <div class="sk-ComponentPage">
      <!-- <component :is="Component" v-if="props" v-bind="props" /> -->
      <PropsEditor
        :props-meta="meta.component.props"
        @mounted="(newProps) => props = newProps"
        @change="(newProps) => props = newProps"
      />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import * as components from '@skgn/melkor/nuxt/components';
import { isArray, isNil } from 'lodash-es';

const route = useRoute();

const { component: componentName } = route.params;

if (isNil(componentName) || isArray(componentName)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Component not found',
    fatal: true,
  });
}

const normalizedComponentName = capitalize(componentName);

const meta = useComponentMeta(normalizedComponentName);

if (!meta) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Component not found',
    fatal: true,
  });
}

// const Component = components[normalizedComponentName as keyof typeof components];

const props = ref<Record<string, any> | null>(null);
</script>

<style lang="scss">
.sk-ComponentPage {
  display: flex;
  flex: 1 1 auto;
}
</style>
