<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Colors
    </template>
    <AppCard>
      <em>Hover a color card to see corresponding <code>css</code> colors</em>
    </AppCard>
    <AppCard class="sk-ColorsView-list">
      <AppColorIntent intent="primary" />
      <AppColorIntent intent="neutral" />
      <AppColorIntent intent="success" />
      <AppColorIntent intent="danger" />
      <AppColorIntent intent="error" />
      <AppColorIntent intent="info" />
    </AppCard>
  </NuxtLayout>
</template>

<style lang="scss">
.sk-ColorsView {
  &-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    // flex-direction: column;
    gap: var(--mk-size-10);
  }
}
</style>
