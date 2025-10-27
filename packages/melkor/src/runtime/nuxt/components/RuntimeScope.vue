<template>
  <RuntimeScope v-bind="props">
    <template #raw>
      Nuxt
    </template>
  </RuntimeScope>
</template>

<script lang="ts">
import type { RuntimeScopeProps } from '../../vue/components/RuntimeScope.vue';

export * from '../../vue/components/RuntimeScope.vue';
</script>

<script lang="ts" setup>
import RuntimeScope from '../../vue/components/RuntimeScope.vue';

const props = withDefaults(defineProps<RuntimeScopeProps>(), {
  raw: 'pure#Nuxt',
  reference: 'ref#Nuxt',
});
</script>
