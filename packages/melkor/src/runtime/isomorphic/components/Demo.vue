<template>
  <div>
    {{ props }}
  </div>
</template>

<script lang="ts">
export type DemoProps = {
  a?: string;
  b?: number;
  c?: boolean;
};

export const demoDefaultProps = {
  a: '2',
  b: 1,
  c: true,
};
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<DemoProps>(),
  demoDefaultProps,
);
</script>
