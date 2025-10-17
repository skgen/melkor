<template>
  <div class="sk-TheAsideNavigation">
    <MkCard>
      <ul
        v-if="scopedNavigation?.children"
        class="sk-TheAsideNavigation-list"
      >
        <li
          v-for="item of scopedNavigation.children"
          :key="item.stem"
        >
          <AppNavigationLevel :navigation-item="item" />
        </li>
      </ul>
    </MkCard>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const navigation = await useDocsNavigation();

const scopedNavigation = computed(() => {
  // const slug = route.params.slug?.[0] as string;
  // console.log(route.params.slug);
  // console.log(navigation.value);

  return navigation.value.find(v => route.path.startsWith(v.path));
});
</script>

<style lang="scss">
.sk-TheAsideNavigation {
  padding: var(--mk-size-8) var(--mk-size-4) var(--mk-size-8) 0;

  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-4);
  }
}
</style>
