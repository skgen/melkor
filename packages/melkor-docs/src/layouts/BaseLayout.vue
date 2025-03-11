<template>
  <div class="sk-BaseLayout">
    <div class="sk-BaseLayout-container">
      <aside class="sk-BaseLayout-aside">
        <TheAsideNavigation />
      </aside>
      <main class="sk-BaseLayout-main">
        <h1>
          <slot name="title" />
        </h1>
        <div class="sk-BaseLayout-main-content">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-BaseLayout {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--app-container-width);
  min-height: 100vh;
  padding: 0 var(--app-container-padding-x);
  margin: 0 auto;

  &-container {
    display: grid;
    flex: 1;
    grid-template-columns: 220px minmax(0, 1fr);
  }

  &-main {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-8);
    padding: var(--mk-size-8) 0;

    &-content {
      display: flex;
      flex-direction: column;
      gap: var(--mk-size-4);
    }
  }

  &-aside {
    position: sticky;
    top: 60px;
    height: calc(100vh - 60px);
  }
}
</style>
