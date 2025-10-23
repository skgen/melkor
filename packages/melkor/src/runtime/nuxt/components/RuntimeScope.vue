<template>
  <RuntimeScope v-bind="props">
    <template #raw>
      Nuxt
    </template>
  </RuntimeScope>
</template>

<script lang="ts">
import type { InferDefaults } from '#melkor/features';
import type { RuntimeScopeProps } from '../../vue/components/RuntimeScope.vue';

export * from '../../vue/components/RuntimeScope.vue';

export const runtimeScopeDefaultProps = {
  raw: 'pure#Nuxt',
  reference: 'ref#Nuxt',
} satisfies InferDefaults<RuntimeScopeProps>;
</script>

<script lang="ts" setup>
import RuntimeScope from '../../vue/components/RuntimeScope.vue';

const props = withDefaults(defineProps<RuntimeScopeProps>(), runtimeScopeDefaultProps);
</script>
