<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Progress
    </template>
    <AppStack col>
      <MkCard>
        <pre>{{ range }}</pre>
        <input v-model="range" type="range" :max="steps.length - 1" :style="{ width: '200px' }">
      </MkCard>
      <AppStack align="end">
        <AppStack col>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ width: '200px' }"
            />
          </MkCard>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ width: '200px' }"
              label="value"
            />
          </MkCard>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ width: '200px' }"
              label="percentage"
            />
          </MkCard>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps"
              :style="{ width: '200px' }"
              label="percentage"
            />
          </MkCard>
        </AppStack>
        <AppStack>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ height: '200px' }"
              direction="vertical"
            />
          </MkCard>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ height: '200px' }"
              direction="vertical"
              label="value"
            />
          </MkCard>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps.length - 1"
              :style="{ height: '200px' }"
              direction="vertical"
              label="percentage"
            />
          </MkCard>
          <MkCard>
            <AppProgress
              :model-value="range"
              :max="steps"
              :style="{ height: '200px' }"
              direction="vertical"
              label="percentage"
            />
          </MkCard>
        </AppStack>
      </AppStack>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const range = ref(5);

const steps = Array.from({ length: 10 }).map((v, i) => `step ${i}`);
</script>
