<template>
  <code class="sk-ProseCode"><slot /></code>
</template>

<script lang="ts" setup>
type Props = {
  lang?: string;
};

defineProps<Props>();
</script>

<style lang="scss">
.sk-ProseCode {
  display: inline-block;
  padding: var(--mk-size-2);
  font-size: 0.8rem;
  background-color: var(--mk-core-background-color);
  border: var(--mk-border-size) solid var(--mk-border-color);
  border-radius: var(--mk-border-radius-size);
}
</style>
