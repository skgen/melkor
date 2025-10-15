<template>
  <div
    v-theme="theme"
    class="mk-BuildTester"
  >
    <Environment />
    <div>framework: {{ framework }}</div>
  </div>
</template>

<script lang="ts" setup>
import Environment from '#melkor/components/Environment.vue';
import { useFramework, useTheme } from '#melkor/composables';

const theme = useTheme();

const framework = useFramework();
</script>
