<template>
  <MkInputText :value="props.value" @update:value="(v) => emits('update:value', v)" />
</template>

<script lang="ts" setup>
type Props = {
  value: string | null;
};

type Emits = {
  'update:value': [newValue: string | null];
};

const props = defineProps<Props>();

const emits = defineEmits<Emits>();
</script>
