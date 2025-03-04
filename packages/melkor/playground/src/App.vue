<template>
  <TheApp>
    <div class="sk-App">
      <!-- <AppColorScheme /> -->
      <AppButton>Click me</AppButton>
    </div>
    <!-- <div class="grid">
        <AppCard class="header" style="padding: 16px">
          header
          <template v-for="i in 11" :key="i">
            <AppCard type="highlight" :style="{ padding: i % 2 === 0 ? '16px' : null }">
              <template v-if="i % 2 === 0">
                <AppCard style="padding: 0; padding-top: 100%" type="highlight" />
              </template>
            </AppCard>
          </template>
        </AppCard>
        <AppCard class="profile" type="highlight">
          profile
          <pre>{{ globalConfig }}</pre>
        </AppCard>
        <AppCard class="sidebar">
          sidebar
        </AppCard>
        <AppCard class="main" style="height: 600px;">
          main
          <template v-for="i in 5" :key="i">
            <AppCard type="surface" style="padding: 0; padding-top: 100%" />
          </template>
          <template v-for="i in 5" :key="i">
            <AppCard type="contrast" style="padding: 0; padding-top: 100%" />
          </template>
        </AppCard>
        <AppCard class="aside" style="height: 50%;">
          aside
        </AppCard>
        <AppCard class="aside-footer" style="height: 100%;">
          aside-footer
        </AppCard>
      </div> -->
    <!-- <div class="row" style="height: 80px;">
          <AppCard style="flex: 70%;" />
          <AppCard style="flex: 30%;" />
        </div>
        <div class="row" style="height: 200px;">
          <AppCard style="flex: 30%;" />
          <AppCard style="flex: 70%;" />
        </div>
        <div class="row" style="height: 400px;">
          <div class="col">
            <AppCard style="flex: 30%; height: 100px;" />
          </div>
          <AppCard style="flex: 70%;" />
        </div> -->
    <!-- </div> -->
    <!-- <div>
        hello !
      </div> -->
    <!-- <div> -->
    <!-- <div class="col"> -->
    <!-- <div v-for="block of (['plain', 'outline', 'text', 'light'] as const)" :key="block" class="block">
          <span>{{ block }}</span>
          <AppButton v-for="size of (['tight', undefined, 'wide'] as const)" :size="size" :type="block">
            Click me <AppIcon icon="material-symbols:add-moderator" inline />
          </AppButton>
        </div> -->
    <!-- </div> -->
    <!-- <AppTemplate>

        </AppTemplate> -->
    <!-- </div> -->
    <!--
      <div>
        zdadaz
        <AppIcon icon="material-symbols:add-moderator" inline />
        dzadaz
      </div> -->
    <!-- <pre>{{ globalConfig }}</pre>
      <pre>{{ globalTheme }}</pre> -->

    <div>
      <!-- <AppThemeSelector /> -->
      <!-- <AppThemeSelector />
        <AppThemeSelector /> -->
    </div>
  </TheApp>
</template>

<script lang="ts" setup>
import AppColorBlock from '@/AppColorBlock.vue';
import AppColorPalette from '@/AppColorPalette.vue';
import AppColorScheme from '@/AppColorScheme.vue';
import { generate, shades } from '@/colors';
import AppButton from '@skgn/melkor/components/AppButton';
import AppCard from '@skgn/melkor/components/AppCard';
import AppIcon from '@skgn/melkor/components/AppIcon';
import AppThemeSelector from '@skgn/melkor/components/AppThemeSelector';
import TheApp from '@skgn/melkor/components/TheApp';
import { useGlobalConfig } from '@skgn/melkor/composables';
import { computed, ref, watch } from 'vue';




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
