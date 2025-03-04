<template>
  <div class="sk-AppColorBlock" :style="{ '--bgcolor': props.color }" :data-color="props.color" />
</template>

<script lang="ts" setup>
interface Props {
  color: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss">
.sk-AppColorBlock {
  position: relative;

  &::before {
    display: block;
    content: attr(data-color);
    margin-bottom: 4px;
    text-transform: lowercase;
  }

  &::after {
    display: block;
    content: '';
    background-color: var(--bgcolor);
    width: 80px;
    height: 80px;
  }

  &[data-is-active='true'] {
    border: 1px solid red;
  }
}
</style>
