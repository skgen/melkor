<template>
  <header class="sk-TheHeader">
    <div class="sk-TheHeader-container">
      <NuxtLink class="sk-TheHeader-logo" to="/">
        Melkor
      </NuxtLink>

      <div class="sk-TheHeader-dashboard">
        <ClientOnly>
          <MkThemeToggle compact />
        </ClientOnly>
      </div>
    </div>
    <div class="sk-TheHeader-separator" />
    <div class="sk-TheHeader-container">
      <nav class="sk-TheHeader-subnav">
        <ul class="sk-TheHeader-subnav-list">
          <li v-for="item of navigation" :key="item.path">
            <NuxtLink :to="item.path">
              <MkButton variant="outline" :active="isShallowActive(item.path)">
                <MkIcon v-if="item.icon" :icon="item.icon" />
                {{ item.title }}
              </MkButton>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="sk-TheHeader-frameworks">
        <MkButton
          v-for="framework of frameworks"
          :key="framework.value"
          variant="outline"
          :active="framework.active"
          size="tight"
          @click="() => currentFramework = framework.value"
        >
          <MkIcon :icon="framework.icon" />
          {{ framework.title }}
        </MkButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const navigation = await useDocsNavigation();
const { framework: currentFramework, frameworks } = useFramework();

const route = useRoute();
function isShallowActive(path: string) {
  return route.path.startsWith(path);
}
</script>

<style lang="scss">
@use '#melkor/styles/mixins' as melkor;

.sk-TheHeader {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--mk-shade-0-75);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--mk-border-color);

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
    height: var(--app-header-height);
    padding: 0 var(--app-container-padding-x);
    margin: 0 auto;
  }

  &-separator {
    border-bottom: 1px solid var(--mk-border-color);
  }

  &-subnav {
    flex: 1;

    &-list {
      display: flex;
      gap: var(--mk-size-1);
      align-items: center;
    }
  }

  &-dashboard {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }

  &-frameworks {
    display: flex;
    gap: var(--mk-size-2);
  }
}
</style>
