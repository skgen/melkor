<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Radio
    </template>

    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => radio?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => radio?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputRadio
          ref="radio"
          v-bind="inputBinding"
          :options="options"
          name="radio"
          nullable
          :validate="handleValidate"
        >
          <template #label>
            Radio
          </template>
          <template #hint>
            Type your radio
          </template>
          <template #option="{ option }">
            {{ option.value?.name }}
          </template>
        </AppInputRadio>
      </AppStack>
    </MkCard>

    <MkCard>
      <AppInputRadio
        v-bind="inputBinding"
        :options="options"
        direction="horizontal"
        :validate="handleValidate"
      >
        <template #label>
          Radio
        </template>
        <template #hint>
          Type your radio
        </template>
        <template #option="{ option }">
          {{ option.value?.name }}
        </template>
      </AppInputRadio>
    </MkCard>

    <MkCard>
      <AppInputRadio
        v-bind="inputBinding"
        nullable
        :validate="handleValidate"
        disabled
      >
        <template #label>
          Radio
        </template>
        <template #hint>
          Type your radio
        </template>
        <template #option="{ option }">
          {{ option.value?.name }}
        </template>
      </AppInputRadio>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputRadioExpose, InputRadioProps } from '#melkor/features';

type InputRadioValue = { name: string; side: 'good' | 'evil' } | null;

const options: InputRadioProps<InputRadioValue>['options'] = [
  { value: { name: 'Gondor', side: 'good' } },
  { value: { name: 'Mordor', side: 'evil' }, disabled: true },
  { value: { name: 'Rohan', side: 'good' } },
  { value: { name: 'Isengar', side: 'evil' } },
  { value: { name: 'Hobbits', side: 'good' } },
  { value: { name: 'Dwarves', side: 'good' } },
  { value: { name: 'Haradrim', side: 'evil' } },
];

const radio = ref<InputRadioExpose | null>(null);

const inputBinding = reactive(
  useInputBinding<InputRadioProps<InputRadioValue>>({
    value: options[0]!.value,
    options,
  }),
);

function handleValidate(value: InputRadioValue) {
  if (value?.side === 'evil') {
    return 'Pick a faction of good !';
  }
}
</script>
