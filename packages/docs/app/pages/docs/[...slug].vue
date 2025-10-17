<template>
  <NuxtLayout name="docs">
    <MkCard v-if="page">
      <MkProse as-child>
        <ContentRenderer :value="page" />
      </MkProse>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first());

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { framework } = useFramework();

if (!import.meta.prerender) {
  // Redirect to the correct framework version if the page is not the current framework
  watch(framework, () => {
    if (page.value?.framework && page.value?.framework !== framework.value) {
      if (route.path.endsWith(`/${page.value?.framework}`)) {
        navigateTo(`${route.path.split('/').slice(0, -1).join('/')}/${framework.value}`);
      }
      else {
        navigateTo(`/docs/getting-started`);
      }
    }
  });
}

// const title = page.value?.seo?.title ? page.value.seo.title : page.value?.navigation?.title ? page.value.navigation.title : page.value?.title;
// const prefix = page.value?.path.includes('components/') || page.value?.path.includes('composables/') ? 'Vue ' : '';
// const suffix = page.value?.path.includes('components/') ? 'Component ' : page.value?.path.includes('composables/') ? 'Composable ' : '';
// const description = page.value?.seo?.description ? page.value.seo.description : page.value?.description;

// useSeoMeta({
//   // titleTemplate: `${prefix}%s ${suffix}- Nuxt UI ${page.value?.framework === 'vue' ? ' for Vue' : ''}`,
//   // title,
//   // ogTitle: `${prefix}${title} ${suffix}- Nuxt UI ${page.value?.framework === 'vue' ? ' for Vue' : ''}`,
//   // description,
//   // ogDescription: description,
// });

useSeoMeta(({
  title: 'Melkor - Button',
}));
</script>
