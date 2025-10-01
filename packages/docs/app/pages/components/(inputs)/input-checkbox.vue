<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Checkbox
    </template>

    <AppCard>
      <AppStack col>
        <AppStack>
          <AppButton variant="outline" @click="() => checkbox?.focus()">
            Focus
          </AppButton>
          <AppButton variant="outline" @click="() => checkbox?.blur()">
            Blur
          </AppButton>
        </AppStack>
        <AppInputCheckbox
          v-bind="inputBinding"
          ref="checkbox"
          :validate="handleValidate"
          checked-label="Checked"
          unchecked-label="Unchecked"
        >
          <template #label>
            <AppIcon icon="material-symbols:admin-panel-settings-outline" />
            Protect yourself
          </template>
          <template #hint>
            Check to add protection
          </template>
          <template #checked-label>
            Protected <AppIcon icon="material-symbols:admin-panel-settings" />
          </template>
          <template #unchecked-label>
            Vulnerable
          </template>
        </AppInputCheckbox>
      </AppStack>
    </AppCard>
    <AppCard>
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
          <AppIcon icon="material-symbols:admin-panel-settings-outline" />
          Protect yourself
        </template>
        <template #hint>
          Check to add protection
        </template>
        <template #checked-label>
          Protected <AppIcon icon="material-symbols:admin-panel-settings" />
        </template>
        <template #unchecked-label>
          Vulnerable
        </template>
      </AppInputCheckbox>
    </AppCard>
    <AppCard>
      <AppInputCheckbox
        v-bind="inputBinding"
        hint="Type your checkbox"
        label="Checkbox"
        :validate="handleValidate"
        disabled
      >
        <template #label>
          <AppIcon icon="material-symbols:admin-panel-settings-outline" />
          Protect yourself
        </template>
        <template #hint>
          Check to add protection
        </template>
        <template #checked-label>
          Protected <AppIcon icon="material-symbols:admin-panel-settings" />
        </template>
        <template #unchecked-label>
          Vulnerable
        </template>
      </AppInputCheckbox>
    </AppCard>
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
