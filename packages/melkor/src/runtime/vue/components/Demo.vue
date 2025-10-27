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
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<DemoProps>(),
  {
    a: '2',
    b: 1,
    c: true,
  },
);
</script>
