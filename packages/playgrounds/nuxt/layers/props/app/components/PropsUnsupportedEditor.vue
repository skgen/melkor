<template>
  <div class="sk-PropsUnsupportedEditor">
    Unsupported
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-PropsUnsupportedEditor {
  --props-unsupported-editor-line-color: var(--mk-primary-15);
  --props-unsupported-editor-line-size: 2px;
  --props-unsupported-editor-line-offset: 4px;

  position: relative;
  padding-block: var(--mk-size-2);
  padding-inline: var(--mk-size-4);
  overflow: hidden;
  text-transform: uppercase;
  border: var(--props-unsupported-editor-line-size) solid var(--props-unsupported-editor-line-color);
  border-radius: var(--mk-border-radius-size);

  &::before {
    position: absolute;
    inset: 0;
    content: '';
    background: repeating-linear-gradient(
      135deg,
      transparent,
      transparent var(--props-unsupported-editor-line-offset),
      var(--props-unsupported-editor-line-color) var(--props-unsupported-editor-line-offset),
      var(--props-unsupported-editor-line-color)
        calc(var(--props-unsupported-editor-line-offset) + var(--props-unsupported-editor-line-size))
    );
  }
}
</style>
