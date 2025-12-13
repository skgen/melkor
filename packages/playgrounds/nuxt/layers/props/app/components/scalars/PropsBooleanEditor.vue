<template>
  <MkInputToggle :value="props.value" @update:value="(v) => emits('update:value', v)" />
</template>

<script lang="ts" setup>
type Props = {
  value: boolean;
};

type Emits = {
  'update:value': [newValue: boolean];
};

const props = defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
