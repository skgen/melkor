<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Melkor v2
    </template>
    <div class="sk-TheHomePageView">
      <div>
        <AppColorPalette
          :colors="[
            `var(--mk-shade-0)`,
            `var(--mk-shade-1)`,
            `var(--mk-shade-2)`,
            `var(--mk-shade-3)`,
            `var(--mk-shade-4)`,
            `var(--mk-shade-5)`,
            `var(--mk-shade-6)`,
            `var(--mk-shade-7)`,
            `var(--mk-shade-8)`,
            `var(--mk-shade-9)`,
            `var(--mk-shade-10)`,
          ]"
        />
      </div>

      <div>
        <AppSkeleton height="400px" />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.sk-TheHomePageView {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-8);

  &-components {
    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: var(--mk-size-4);

      .mk-AppCard {
        text-align: center;
      }
    }
  }
}
</style>
