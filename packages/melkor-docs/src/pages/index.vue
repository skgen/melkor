<template>
  <NuxtLayout name="base-layout">
    <template #title>
      <span class="sk-TheHomePageView-title">Melkor v2</span>
    </template>
    <div class="sk-TheHomePageView">
      <!-- <div>
        <AppSkeleton height="400px" />
      </div> -->
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.sk-TheHomePageView {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-8);

  &-title {
    display: block;
    font-size: 40px;
  }
}
</style>
