<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Checkables
    </template>
    <div class="sk-CheckablesView">
      <AppStack col>
        <AppCard>
          <AppStack col>
            <span>Checkbox</span>
            <AppCheckbox :checked="checked" @click="() => checked = !checked" />
            <AppStack>
              <AppCheckbox />
              <AppCheckbox checked />
              <AppCheckbox disabled />
              <AppCheckbox disabled checked />
            </AppStack>
          </AppStack>
        </AppCard>
        <AppCard>
          <AppRadio checked />
        </AppCard>
        <AppCard>
          <AppToggle checked />
        </AppCard>
      </AppStack>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const checked = ref(false);
</script>
