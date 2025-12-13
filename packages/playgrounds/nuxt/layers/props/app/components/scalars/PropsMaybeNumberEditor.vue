<template>
  <MkInputNumber :value="props.value" @update:value="(v) => emits('update:value', v)" />
</template>

<script lang="ts" setup>
type Props = {
  value: number | null;
};

type Emits = {
  'update:value': [newValue: number | null];
};

const props = defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
