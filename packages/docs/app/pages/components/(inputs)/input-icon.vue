<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Icon
    </template>
    <AppCard>
      <AppStack col>
        <AppStack>
          <AppButton variant="outline" @click="() => input?.focus()">
            Focus
          </AppButton>
          <AppButton variant="outline" @click="() => input?.blur()">
            Blur
          </AppButton>
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
            <AppIcon icon="material-symbols:abc" />
          </template>
        </AppInputIcon>
      </AppStack>
    </AppCard>
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
