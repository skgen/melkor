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
          <AppStack col>
            <span>Radio</span>
            <AppRadio :checked="checked" @click="() => checked = !checked" />
            <AppStack>
              <AppRadio />
              <AppRadio checked />
              <AppRadio disabled />
              <AppRadio disabled checked />
            </AppStack>
          </AppStack>
        </AppCard>
        <AppCard>
          <AppStack col>
            <span>Toggle</span>
            <AppToggle :checked="checked" @click="() => checked = !checked" />
            <AppStack>
              <AppToggle />
              <AppToggle checked />
              <AppToggle disabled />
              <AppToggle disabled checked />
            </AppStack>
          </AppStack>
        </AppCard>
      </AppStack>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const checked = ref(false);
</script>
