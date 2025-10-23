<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Icon
    </template>
    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => input?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => input?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputIcon
          ref="input"
          v-bind="inputBinding"
          :column-size="10"
        >
          <template #label>
            Icon
          </template>
          <template #hint>
            Pickup your icon
          </template>
        </AppInputIcon>
        <AppInputIcon
          ref="input"
          v-bind="inputBinding"
          :column-size="10"
          cancelable
        >
          <template #label>
            Icon
          </template>
          <template #hint>
            Pickup your icon
          </template>
          <template #placeholder>
            <MkIcon icon="material-symbols:abc" />
          </template>
        </AppInputIcon>
      </AppStack>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputIconExpose, InputIconProps, InputIconValue } from '../../../../../melkor/lib/features/io/input-icon';

const inputBinding: InputIconProps = reactive(
  useInputBinding<InputIconProps>({
    value: null,
  }),
);

const input = ref<InputIconExpose | null>(null);

// function handleValidate(value: InputTextValue) {
//   if (!value) {
//     return 'required';
//   }
//   if (value.length < 5) {
//     return [
//       'value must be > 5',
//       'dummy error',
//     ];
//   }
//   return null;
// }

// const inputPasswordModel = reactive(
//   inputModel<InputTextValue>({
//     value: 'Azerty123',
//     valid: false,
//     error: 'Password invalid',
//   }),
// );
</script>
