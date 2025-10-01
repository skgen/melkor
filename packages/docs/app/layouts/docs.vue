<template>
  <div class="sk-DocsLayout">
    <div class="sk-DocsLayout-container">
      <aside class="sk-DocsLayout-aside">
        <TheAsideNavigation />
      </aside>
      <main class="sk-DocsLayout-main">
        <h1 v-if="$slots.title" class="sk-DocsLayout-title">
          <slot name="title" />
        </h1>
        <div class="sk-DocsLayout-main-content">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.sk-DocsLayout {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--app-container-width);
  min-height: 100vh;
  padding: 0 var(--app-container-padding-x);
  margin: 0 auto;

  &-title {
    font-size: 2rem;
    font-weight: 600;
  }

  &-container {
    display: grid;
    flex: 1;
    grid-template-columns: 220px minmax(0, 1fr);
  }

  &-main {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-8);

    // min-height: var(100vh - var(--app-header-height));
    padding: var(--mk-size-8) 0;

    &-content {
      display: flex;
      flex-direction: column;
      gap: var(--mk-size-4);
    }
  }

  &-aside {
    position: sticky;
    top: var(--app-header-height);
    max-height: 100%;
  }
}
</style>
