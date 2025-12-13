<template>
  <MkTheApp>
    <div class="sk-App">
      <nav class="sk-App-sidebar">
        dza
        dza
        dza
      </nav>
      <div class="sk-App-content">
        <header class="sk-App-header">
          header
        </header>
        <main class="sk-App-main">
          main
        </main>
      </div>
      <!-- <AppDemo /> -->
    </div>
  </MkTheApp>
</template>

<script lang="ts" setup>
import AppDemo from '../../nuxt/app/components/AppDemo.vue';
</script>

<style lang="scss">
.sk-App {
  display: flex;
  align-items: stretch;

  &-sidebar {
  }

  &-content {
    &-header {
    }

    &-main {
    }
  }
}
</style>
