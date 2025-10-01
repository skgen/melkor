<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Button
    </template>
    <AppStack col>
      <AppCard>
        <AppStack gap="m" align="center">
          <AppButton size="compact">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton size="tight">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton>
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton size="wide">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton disabled>
            Cancel <AppIcon icon="material-symbols:do-not-disturb-on" />
          </AppButton>
          <AppButton active>
            Cancel <AppIcon icon="material-symbols:check-circle" />
          </AppButton>
          <AppButton icon size="compact">
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
          <AppButton icon size="tight">
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
          <AppButton icon>
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
          <AppButton icon size="wide">
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
        </AppStack>
        <AppStack gap="m" align="center">
          <AppButton variant="plain" intent="primary">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton variant="plain" intent="neutral">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
        </AppStack>
      </AppCard>
      <AppCard>
        <AppStack gap="m" align="center">
          <AppButton size="compact" variant="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton size="tight" variant="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton variant="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton size="wide" variant="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton variant="outline" disabled>
            Cancel <AppIcon icon="material-symbols:do-not-disturb-on" />
          </AppButton>
          <AppButton variant="outline" active>
            Cancel <AppIcon icon="material-symbols:check-circle" />
          </AppButton>
          <AppButton variant="outline" icon size="compact">
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
          <AppButton variant="outline" icon size="tight">
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
          <AppButton variant="outline" icon>
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
          <AppButton variant="outline" icon size="wide">
            <AppIcon icon="material-symbols:add-2" />
          </AppButton>
        </AppStack>
        <AppStack gap="m" align="center">
          <AppButton variant="outline" intent="primary">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton variant="outline" intent="neutral">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
        </AppStack>
      </AppCard>
      <AppCard>
        <AppComponentProps name="AppButton" />
      </AppCard>
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
