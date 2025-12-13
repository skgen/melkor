<template>
  <div class="sk-DefaultLayout">
    <nav class="sk-DefaultLayout-sidebar">
      <MkThemeToggle compact />
      <div v-for="group of navigation" :key="group.id" class="sk-DefaultLayout-sidebar-group">
        <NuxtLink v-for="item of group.items" :key="item.label" :to="item.to">
          <MkButton variant="outline">
            <MkIcon :icon="item.icon" /> {{ item.label }}
          </MkButton>
        </NuxtLink>
      </div>
    </nav>
    <div class="sk-DefaultLayout-content">
      <header class="sk-DefaultLayout-content-header">
        <slot name="header-name" />
        <slot name="header-props" />
      </header>
      <main class="sk-DefaultLayout-content-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const navigation = useNavigation();
</script>

<style lang="scss">
.sk-DefaultLayout {
  display: flex;
  align-items: stretch;
  min-height: 100vh;

  &-sidebar {
    display: flex;
    flex: 0 0 300px;
    flex-direction: column;
    gap: var(--mk-size-4);
    padding: var(--mk-size-4);
    border-inline-end: 1px solid var(--mk-border-color);

    &-group {
      display: flex;
      flex-direction: column;
      gap: var(--mk-size-1);

      a {
        display: inline-flex;

        > * {
          width: 100%;
        }
      }
    }
  }

  &-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;

    &-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--mk-size-4);
      border-block-end: 1px solid var(--mk-border-color);
    }

    &-main {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      padding: var(--mk-size-4);
    }
  }
}
</style>
