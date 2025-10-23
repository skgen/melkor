<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Text
    </template>

    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => text?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => text?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputText
          ref="text"
          v-bind="inputTextBinding"
          cancelable
          placeholder="Username"
          :validate="handleValidate"
        >
          <template #label>
            <MkIcon icon="heroicons:user-circle-16-solid" /> Username
          </template>
          <template #hint>
            Type your username
          </template>
          <template #trailing-icon>
            <MkIcon icon="heroicons:user-circle-16-solid" />
          </template>
        </AppInputText>
      </AppStack>
    </MkCard>
    <MkCard>
      <AppInputText
        v-bind="inputPasswordBinding"
        cancelable
        secure
        placeholder="Password"
      >
        <template #label>
          <MkIcon icon="heroicons:lock-closed-20-solid" /> Password
        </template>
        <template #hint>
          Type your password
        </template>
        <template #leading-icon>
          <MkIcon icon="heroicons:lock-closed-20-solid" />
        </template>
      </AppInputText>
    </MkCard>
    <MkCard>
      <AppInputText
        v-bind="inputPasswordBinding"
        cancelable
        placeholder="disabled@disabled.com"
        disabled
        secure
      >
        <template #label>
          <MkIcon icon="heroicons:no-symbol-20-solid" /> Disabled
        </template>
        <template #hint>
          I'm disabled
        </template>
      </AppInputText>
    </MkCard>
    <MkCard>
      <AppComponentProps name="AppInputText" />
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextExpose, InputTextProps, InputTextValue } from '#melkor/features';

const inputTextBinding = reactive(
  useInputBinding<InputTextProps>({
    value: 'Hello world',
  }),
);

const text = ref<InputTextExpose | null>(null);

function handleValidate(value: InputTextValue) {
  if (!value) {
    return 'required';
  }
  if (value.length < 5) {
    return [
      'value must be > 5',
      'dummy error',
    ];
  }
}

const inputPasswordBinding = reactive(
  useInputBinding<InputTextProps>({
    value: 'Azerty123',
    valid: false,
    errors: ['Password invalid'],
  }),
);
</script>
