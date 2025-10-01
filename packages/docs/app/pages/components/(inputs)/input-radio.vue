<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Radio
    </template>

    <AppCard>
      <AppStack col>
        <AppStack>
          <AppButton variant="outline" @click="() => radio?.focus()">
            Focus
          </AppButton>
          <AppButton variant="outline" @click="() => radio?.blur()">
            Blur
          </AppButton>
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
    </AppCard>

    <AppCard>
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
    </AppCard>

    <AppCard>
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
    </AppCard>
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
