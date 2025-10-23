<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Checkbox
    </template>

    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => checkbox?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => checkbox?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputCheckbox
          v-bind="inputBinding"
          ref="checkbox"
          :validate="handleValidate"
          checked-label="Checked"
          unchecked-label="Unchecked"
        >
          <template #label>
            <MkIcon icon="material-symbols:admin-panel-settings-outline" />
            Protect yourself
          </template>
          <template #hint>
            Check to add protection
          </template>
          <template #checked-label>
            Protected <MkIcon icon="material-symbols:admin-panel-settings" />
          </template>
          <template #unchecked-label>
            Vulnerable
          </template>
        </AppInputCheckbox>
      </AppStack>
    </MkCard>
    <MkCard>
      <AppInputCheckbox
        v-bind="inputBinding"
        hint="Type your checkbox"
        label="Checkbox"
        :validate="handleValidate"
        checked-label="Checked"
        unchecked-label="Unchecked"
        direction="horizontal"
      >
        <template #label>
          <MkIcon icon="material-symbols:admin-panel-settings-outline" />
          Protect yourself
        </template>
        <template #hint>
          Check to add protection
        </template>
        <template #checked-label>
          Protected <MkIcon icon="material-symbols:admin-panel-settings" />
        </template>
        <template #unchecked-label>
          Vulnerable
        </template>
      </AppInputCheckbox>
    </MkCard>
    <MkCard>
      <AppInputCheckbox
        v-bind="inputBinding"
        hint="Type your checkbox"
        label="Checkbox"
        :validate="handleValidate"
        disabled
      >
        <template #label>
          <MkIcon icon="material-symbols:admin-panel-settings-outline" />
          Protect yourself
        </template>
        <template #hint>
          Check to add protection
        </template>
        <template #checked-label>
          Protected <MkIcon icon="material-symbols:admin-panel-settings" />
        </template>
        <template #unchecked-label>
          Vulnerable
        </template>
      </AppInputCheckbox>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputCheckboxExpose, InputCheckboxProps } from '#melkor/features';

const checkbox = ref<InputCheckboxExpose | null>(null);

const inputBinding = reactive(
  useInputBinding<InputCheckboxProps>({
    value: false,
    valid: false,
  }),
);

function handleValidate(value: boolean) {
  if (value === true) {
    return 'Must be false';
  }
}
</script>
