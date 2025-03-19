<template>
  <header class="sk-TheHeader">
    <div class="sk-TheHeader-container">
      <NuxtLink class="sk-TheHeader-logo" to="/">
        Melkor
      </NuxtLink>
      <nav class="sk-TheHeader-nav">
        <ul class="sk-TheHeader-nav-list">
          <li v-for="item of nav" :key="item.path">
            <NuxtLink class="sk-TheHeader-nav-link" :to="item.path">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="sk-TheHeader-dashboard">
        <!-- <AppThemeSelector /> -->
        <AppThemeToggle compact />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const nav = [
  {
    label: 'Components',
    path: '/components/input-text',
  },
  {
    label: 'Composables',
    path: '#',
  },
];
</script>

<style lang="scss">
.sk-TheHeader {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--mk-shade-0-75);
  backdrop-filter: blur(8px);

  &-logo {
    flex: 1;
    font-size: 1.5rem;
  }

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

  &-nav {
    flex: 1;

    &-list {
      display: flex;
      gap: var(--mk-size-1);
      align-items: center;
      justify-content: center;
    }

    &-link {
      padding: var(--mk-size-2);
      border-radius: var(--mk-border-radius-size);
      transition: background-color var(--mk-transition-background-duration);

      &:hover {
        background-color: var(--mk-shade-4);
      }
    }
  }

  &-dashboard {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
