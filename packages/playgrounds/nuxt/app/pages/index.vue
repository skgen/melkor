<template>
  <div class="center">
    <MkButton variant="outline" @click="() => handleClick()">
      Click me
    </MkButton>
    <div class="env">
      <MkEnvironment />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { create } = useToast();

function handleClick() {
  create({
    slots: {
      title: 'Click action dispatched',
    },
  });
}
</script>

<style scoped lang="scss">
.center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.env {
  position: fixed;
  top: var(--mk-size-2);
  left: var(--mk-size-2);
}
</style>
