<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Generator
    </template>
    <div class="sk-TheGeneratorView">
      <div class="sk-TheGeneratorView-theme">
        <h3>Blitz GG</h3>
        <div class="sk-TheGeneratorView-colors">
          <AppColor color="#07090d" />
          <AppColor color="#0e1015" />
          <AppColor color="#13151c" />

          <AppColor color="#191a1f" />
          <AppColor color="#1f2328" />
          <AppColor color="#7e7e7e" />
        </div>
      </div>
      <div class="sk-TheGeneratorView-theme">
        <h3>Github</h3>
        <div class="sk-TheGeneratorView-colors">
          <AppColor color="#02040a" />
          <AppColor color="#0d1116" />
          <AppColor color="#151b23" />
          <AppColor color="#212830" />
        </div>
      </div>

      <div class="sk-TheGeneratorView-theme">
        <h3>Melkor</h3>
        <div class="sk-TheGeneratorView-field">
          <label for="hue">HUE</label>
          <div>
            <input id="hue" v-model="greyTone" type="text">
          </div>
        </div>
        <div class="sk-TheGeneratorView-colors">
          <AppColorGenerator :hue="greyTone" />
        </div>
      </div>
    </div>

    <div>
      <AppColorPalette
        :colors="[
          `var(--mk-shade-0)`,
          `var(--mk-shade-1)`,
          `var(--mk-shade-2)`,
          `var(--mk-shade-3)`,
          `var(--mk-shade-4)`,
          `var(--mk-shade-5)`,
          `var(--mk-shade-6)`,
          `var(--mk-shade-7)`,
          `var(--mk-shade-8)`,
          `var(--mk-shade-9)`,
          `var(--mk-shade-10)`,
        ]"
      />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const primaryTone = ref('#ff3d00');
const greyTone = ref('220');
</script>

<style lang="scss">
.sk-TheGeneratorView {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-6);

  &-theme {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-4);
  }

  &-colors {
    display: flex;
  }

  &-field {
    display: flex;
    flex-direction: column;
  }
}
</style>
