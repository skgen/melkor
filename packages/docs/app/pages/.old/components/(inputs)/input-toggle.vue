<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Toggle
    </template>

    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => toggle?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => toggle?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputToggle
          ref="toggle"
          v-bind="inputBinding"
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
        </AppInputToggle>
      </AppStack>
    </MkCard>
    <MkCard>
      <AppInputToggle
        v-bind="inputBinding"
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
      </AppInputToggle>
    </MkCard>
    <MkCard>
      <AppInputToggle
        v-bind="inputBinding"
        :validate="handleValidate"
        checked-label="Checked"
        unchecked-label="Unchecked"
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
      </AppInputToggle>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputToggleExpose, InputToggleProps } from '#melkor/features';

const inputBinding = reactive(
  useInputBinding<InputToggleProps>({
    value: false,
    valid: false,
  }),
);

const toggle = ref<InputToggleExpose | null>(null);

function handleValidate(value: boolean) {
  if (value === true) {
    return 'Must be false';
  }
}
</script>
