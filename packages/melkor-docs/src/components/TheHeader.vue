<template>
  <header class="sk-TheHeader">
    <div class="sk-TheHeader-container">
      <NuxtLink class="sk-TheHeader-title" to="/">
        Melkor
      </NuxtLink>
      <div class="sk-TheHeader-toolbar">
        <AppThemeSelector />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.sk-TheHeader {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(var(--mk-surface-low-background-color) / 80%);
  backdrop-filter: blur(10px);

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: var(--app-container-width);
    height: 60px;
    padding: 0 var(--app-container-padding-x);
    margin: 0 auto;
  }

  &-title {
    font-size: 24px;
  }

  &-toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  > * {
    flex: 1;
  }
}
</style>
