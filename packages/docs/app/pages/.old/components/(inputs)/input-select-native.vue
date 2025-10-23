<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Select native
    </template>

    <MkCard>
      <InputSelectNative
        v-bind="inputBinding"
        :validate="handleValidate"
      >
        <template #label>
          Faction
        </template>
        <template #hint>
          Pick a faction
        </template>
        <template #option="{ option }">
          {{ option.value?.name }}
        </template>
      </InputSelectNative>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputSelectNativeProps } from '#melkor/features';

type InputSelectNativeValue = { name: string; side: 'good' | 'evil' } | null;

const options: InputSelectNativeProps<InputSelectNativeValue>['options'] = [
  { value: { name: 'Gondor', side: 'good' } },
  { value: { name: 'Mordor', side: 'evil' }, disabled: true },
  { value: { name: 'Rohan', side: 'good' } },
  { value: { name: 'Isengar', side: 'evil' } },
  { value: { name: 'Hobbits', side: 'good' } },
  { value: { name: 'Dwarves', side: 'good' } },
  { value: { name: 'Haradrim', side: 'evil' } },
];

const inputBinding = reactive(
  useInputBinding<InputSelectNativeProps<InputSelectNativeValue>>({
    value: options[0]!.value,
    options,
  }),
);

function handleValidate(value: InputSelectNativeValue) {
  if (value?.side === 'evil') {
    return 'Pick a faction of good !';
  }
}
</script>
