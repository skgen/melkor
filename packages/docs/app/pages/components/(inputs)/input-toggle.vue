<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Toggle
    </template>

    <AppCard>
      <AppStack col>
        <AppStack>
          <AppButton variant="outline" @click="() => toggle?.focus()">
            Focus
          </AppButton>
          <AppButton variant="outline" @click="() => toggle?.blur()">
            Blur
          </AppButton>
        </AppStack>
        <AppInputToggle
          ref="toggle"
          v-bind="inputBinding"
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
        </AppInputToggle>
      </AppStack>
    </AppCard>
    <AppCard>
      <AppInputToggle
        v-bind="inputBinding"
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
      </AppInputToggle>
    </AppCard>
    <AppCard>
      <AppInputToggle
        v-bind="inputBinding"
        :validate="handleValidate"
        checked-label="Checked"
        unchecked-label="Unchecked"
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
      </AppInputToggle>
    </AppCard>
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
