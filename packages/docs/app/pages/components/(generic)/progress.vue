<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Progress
    </template>
    <AppStack col>
      <AppCard>
        <pre>{{ range }}</pre>
        <input v-model="range" type="range" :max="steps.length - 1" :style="{ width: '200px' }">
      </AppCard>
      <AppStack align="end">
        <AppStack col>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ width: '200px' }"
            />
          </AppCard>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ width: '200px' }"
              label="value"
            />
          </AppCard>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ width: '200px' }"
              label="percentage"
            />
          </AppCard>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps"
              :style="{ width: '200px' }"
              label="percentage"
            />
          </AppCard>
        </AppStack>
        <AppStack>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ height: '200px' }"
              direction="vertical"
            />
          </AppCard>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ height: '200px' }"
              direction="vertical"
              label="value"
            />
          </AppCard>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ height: '200px' }"
              direction="vertical"
              label="percentage"
            />
          </AppCard>
          <AppCard>
            <AppProgress
              :model-value="range"
              :max="steps"
              :style="{ height: '200px' }"
              direction="vertical"
              label="percentage"
            />
          </AppCard>
        </AppStack>
      </AppStack>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const range = ref(5);

const steps = Array.from({ length: 10 }).map((v, i) => `step ${i}`);
</script>
