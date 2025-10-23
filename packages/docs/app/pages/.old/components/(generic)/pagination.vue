<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Pagination
    </template>
    <AppStack col>
      <MkCard>
        <AppPagination v-model="page" :range="range">
          <template #prev-text>
            Prev
          </template>
          <template #next-text>
            Next
          </template>
        </AppPagination>
      </MkCard>
      <MkCard>
        <AppComponentProps name="AppPagination" />
      </MkCard>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const page = ref(5);
const range = ref<[number, number]>([1, 10]);
</script>
