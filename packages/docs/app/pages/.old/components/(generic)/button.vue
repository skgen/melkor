<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Button
    </template>
    <AppStack col>
      <MkCard>
        <AppStack gap="m" align="center">
          <MkButton size="compact">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton size="tight">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton>
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton size="wide">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton disabled>
            Cancel <MkIcon icon="material-symbols:do-not-disturb-on" />
          </MkButton>
          <MkButton active>
            Cancel <MkIcon icon="material-symbols:check-circle" />
          </MkButton>
          <MkButton icon size="compact">
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
          <MkButton icon size="tight">
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
          <MkButton icon>
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
          <MkButton icon size="wide">
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
        </AppStack>
        <AppStack gap="m" align="center">
          <MkButton variant="plain" intent="primary">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton variant="plain" intent="neutral">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
        </AppStack>
      </MkCard>
      <MkCard>
        <AppStack gap="m" align="center">
          <MkButton size="compact" variant="outline">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton size="tight" variant="outline">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton variant="outline">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton size="wide" variant="outline">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton variant="outline" disabled>
            Cancel <MkIcon icon="material-symbols:do-not-disturb-on" />
          </MkButton>
          <MkButton variant="outline" active>
            Cancel <MkIcon icon="material-symbols:check-circle" />
          </MkButton>
          <MkButton variant="outline" icon size="compact">
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
          <MkButton variant="outline" icon size="tight">
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
          <MkButton variant="outline" icon>
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
          <MkButton variant="outline" icon size="wide">
            <MkIcon icon="material-symbols:add-2" />
          </MkButton>
        </AppStack>
        <AppStack gap="m" align="center">
          <MkButton variant="outline" intent="primary">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
          <MkButton variant="outline" intent="neutral">
            Cancel <MkIcon icon="material-symbols:cancel" />
          </MkButton>
        </AppStack>
      </MkCard>
      <MkCard>
        <AppComponentProps name="MkButton" />
      </MkCard>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
useSeoMeta(({
  title: 'Melkor - Button',
}));

// const { data } = await useAsyncData(() =>
//   queryCollection('components').path('/components/button').first(),
// );

// const ast = ref<MDCParserResult | null>(null);
// const parse = useMarkdownParser();

// onBeforeMount(async () => {
//   ast.value = await parse(md.value);
// });

// const { data: ast } = await useAsyncData('markdown', () => parseMarkdown(md.value));
</script>
