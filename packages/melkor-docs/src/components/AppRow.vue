<template>
  <div class="sk-AppRow">
    <slot />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-AppRow {
  display: flex;
  gap: var(--mk-size-4);
  align-items: center;
}
</style>
