<template>
  <div class="sk-TheFooter">
    <AppSkeleton width="200px" height="50px" />
    <AppSkeleton width="200px" height="50px" />
    <AppSkeleton width="200px" height="50px" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-TheFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--app-container-width);
  height: 100px;
  padding: 0 var(--mk-size-4);
  margin: 0 auto;
}
</style>
