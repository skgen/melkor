<template>
  <Environment v-bind="props">
    <slot>Nuxt</slot>
  </Environment>
</template>

<script lang="ts">
import type { EnvironmentProps } from '../../vue/components/Environment.vue';

export * from '../../vue/components/Environment.vue';
</script>

<script lang="ts" setup>
import { isVue2, isVue3 } from '#imports';

import Environment from '../../vue/components/Environment.vue';

const props = defineProps<EnvironmentProps>();
</script>
