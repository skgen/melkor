<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Card
    </template>
    <div class="sk-TheComponentButtonView">
      <AppCard>
        <AppCard>
          <AppCard />
        </AppCard>
      </AppCard>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-TheComponentButtonView {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-8);
  align-items: flex-start;
}
</style>
