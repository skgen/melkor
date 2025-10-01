<template>
  <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" unwrap="p" />
</template>

<script setup lang="ts">
type Props = {
  code: string;
};

const props = defineProps<Props>();

const code = computed(() => {
  if (props.code.startsWith('undefined |')) {
    return props.code.replace('undefined |', '');
  }
  if (props.code.endsWith('| undefined')) {
    return props.code.replace('| undefined', '');
  }
  return props.code;
});

const { data: ast } = await useAsyncData(`hightlight-type-${shallowEncode(code.value)}`, async () => $fetch('/api/parse-mdc', {
  query: {
    mdc: `\`${code.value}\`{lang="typescript"}`,
  },
}));
</script>
