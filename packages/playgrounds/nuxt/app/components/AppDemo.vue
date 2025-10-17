<template>
  <div>
    <div class="center">
      <MkButton variant="outline" @click="() => handleClick()">
        Click me
      </MkButton>
      <MkThemeSelector />
      <div class="env">
        <MkRuntimeScope />
      </div>
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
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}

.env {
  position: fixed;
  top: var(--mk-size-4);
  left: var(--mk-size-4);
}
</style>
