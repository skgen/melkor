<template>
  <PropsMaybeStringEditor
    v-if="props.type === 'string' && !props.required"
    :value="asMaybeString"
    @update:value="props.onChange"
  />
  <PropsStringEditor
    v-else-if="props.type === 'string' && props.required"
    :value="asString"
    @update:value="props.onChange"
  />
  <PropsMaybeNumberEditor
    v-else-if="props.type === 'number' && !props.required"
    :value="asMaybeNumber"
    @update:value="props.onChange"
  />
  <PropsNumberEditor
    v-else-if="props.type === 'number' && props.required"
    :value="asNumber"
    @update:value="props.onChange"
  />
  <PropsBooleanEditor
    v-else-if="props.type === 'boolean'"
    :value="asBoolean"
    @update:value="props.onChange"
  />
</template>

<script lang="ts" setup>
type Props = {
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
  value: string | number | boolean | null;
  onChange: (v: Props['value']) => void;
};
// type Props = {
//   type: 'string';
//   required: true;
//   value: string;
//   onChange: (v: string) => void;
// } | {
//   type: 'number';
//   required: true;
//   value: number;
//   onChange: (v: number) => void;
// } | {
//   type: 'string';
//   required: false;
//   value: string | null;
//   onChange: (v: string | null) => void;
// } | {
//   type: 'number';
//   required: false;
//   value: number | null;
//   onChange: (v: number | null) => void;
// } | {
//   type: 'boolean';
//   value: boolean;
//   required: boolean;
//   onChange: (v: boolean) => void;
// };

const props = defineProps<Props>();

// No other ways to bypass template typescript errors
const asMaybeString = computed(() => props.value as string | null);
const asString = computed(() => props.value as string);
const asMaybeNumber = computed(() => props.value as number | null);
const asNumber = computed(() => props.value as number);
const asBoolean = computed(() => props.value as boolean);
</script>
