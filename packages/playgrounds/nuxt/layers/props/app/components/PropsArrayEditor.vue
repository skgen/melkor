<template>
  <div class="sk-PropsArrayEditor">
    Array
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-PropsArrayEditor {
  --props-array-editor-line-color: var(--mk-primary-15);
  --props-array-editor-line-size: 2px;
  --props-array-editor-line-offset: 4px;

  position: relative;
  padding-block: var(--mk-size-2);
  padding-inline: var(--mk-size-4);
  overflow: hidden;
  text-transform: uppercase;
  border: var(--props-array-editor-line-size) solid var(--props-array-editor-line-color);
  border-radius: var(--mk-border-radius-size);

  &::before {
    position: absolute;
    inset: 0;
    content: '';
    background: repeating-linear-gradient(
      135deg,
      transparent,
      transparent var(--props-array-editor-line-offset),
      var(--props-array-editor-line-color) var(--props-array-editor-line-offset),
      var(--props-array-editor-line-color)
        calc(var(--props-array-editor-line-offset) + var(--props-array-editor-line-size))
    );
  }
}
</style>
