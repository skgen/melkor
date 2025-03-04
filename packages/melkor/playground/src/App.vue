<template>
  <TheApp>
    <div class="sk-App">
      <AppButton>Click me</AppButton>
    </div>
  </TheApp>
</template>

<script lang="ts" setup>
import AppButton from '@skgn/melkor/components/AppButton';
import TheApp from '@skgn/melkor/components/TheApp';
</script>

<style lang="scss" scoped>
.sk-App {
}

.col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-areas:
    'header header header header . . . profile'
    'sidebar main main main main main aside aside'
    '. main main main main main aside-footer aside-footer';
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  width: 100%;

  // grid-template-areas:
  //   '....... header header'
  //   'sidebar content content'
  //   'footer  footer  footer';
  // background-color: #fff;
  // color: #444;
}

.header {
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 12px;
}

.profile {
  grid-area: profile;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  display: grid;
  grid-area: main;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: max-content;
  grid-gap: 16px;
}

.aside {
  grid-area: aside;
}

.aside-footer {
  grid-area: aside-footer;
}
</style>
