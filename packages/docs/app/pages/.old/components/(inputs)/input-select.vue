<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Select
    </template>

    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => select?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => select?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputSelect
          ref="select"
          v-bind="inputSelectModel"
          cancelable
          :validate="handleValidate"
          name="select-x"
        >
          <template #label>
            Faction
          </template>
          <template #hint>
            Pick a faction
          </template>
          <template #value="{ value }">
            {{ value?.name }}
          </template>
          <template #option="{ option }">
            {{ option.value?.name }}
          </template>
        </AppInputSelect>
      </AppStack>
    </MkCard>

    <MkCard>
      <AppInputSelect
        v-bind="inputSelectCollectionModel"
        :options="options"
        :validate="handleValidateCollection"
        name="select-x-collection"
      >
        <template #label>
          Faction
        </template>
        <template #hint>
          Pick multiple factions
        </template>
        <template #value="{ value }">
          {{ value.map(v => v?.name).join(', ') }}
          <!-- <MkButton
            v-for="(v, i) of value" :key="i" variant="outline" outline @click.stop="() => {
              inputSelectCollectionModel.value = inputSelectCollectionModel.value.filter(_v => !isEqual(v, _v))
            }"
          >
            {{ v?.name }} <MkIcon icon="material-symbols:cancel-outline" />
          </MkButton> -->
        </template>
        <template #option="{ option }">
          {{ option.value?.name }}
        </template>
      </AppInputSelect>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputSelectExpose, InputSelectProps } from '#melkor/features';

type InputSelectValue = { name: string; side: 'good' | 'evil' } | null;
type InputSelectCollectionValue = InputSelectValue[];

const options: InputSelectProps<InputSelectValue>['options'] = [
  { value: { name: 'Gondor', side: 'good' } },
  { value: { name: 'Mordor', side: 'evil' }, disabled: true },
  { value: { name: 'Rohan', side: 'good' } },
  { value: { name: 'Isengar', side: 'evil' } },
  { value: { name: 'Hobbits', side: 'good' } },
  { value: { name: 'Dwarves', side: 'good' } },
  { value: { name: 'Haradrim', side: 'evil' } },
];

const inputSelectModel = reactive(
  useInputBinding<InputSelectProps<InputSelectValue>>({
    value: options[0]!.value,
    options,
  }),
);

const inputSelectCollectionModel = reactive(
  useInputBinding<InputSelectProps<InputSelectCollectionValue>>({
    value: [options[0]!.value, options[2]!.value],
    options,
  }),
);

const select = ref<InputSelectExpose | null>(null);

function handleValidate(value: InputSelectValue) {
  if (value?.side === 'evil') {
    return 'Pick a faction of good !';
  }
}

function handleValidateCollection(value: InputSelectCollectionValue) {
  if (value.length < 2) {
    return 'Pick at least 2 factions !';
  }
}
</script>
