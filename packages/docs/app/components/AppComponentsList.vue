<template>
  <ul class="sk-AppComponentsList">
    <li v-for="component of components" :key="component.path">
      <NuxtLink :to="component.path">
        <AppButton variant="outline">
          {{ component.title }}
        </AppButton>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string;
}>();

const { data: components } = await useAsyncData(`components-${props.category}`, () => {
  return queryCollection('docs')
    .where('path', 'LIKE', '/docs/components/%')
    .where('extension', '=', 'md')
    .where('category', '=', props.category)
    .select('path', 'title', 'description')
    .all();
});
</script>

<style lang="scss">
.sk-AppComponentsList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--mk-size-2);
}
</style>
