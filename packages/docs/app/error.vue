<template>
  <TheApp class="sk-TheApp">
    <div class="sk-TheErrorView">
      <AppStack col align="center" justify="center" gap="xl">
        <AppStack row align="center">
          <!-- <h1>Oups ! Une erreur s'est produite. ({{ props.error.statusCode }})</h1> -->
          <NuxtLink to="/">
            <AppButton variant="outline">
              Retour à l'accueil
            </AppButton>
          </NuxtLink>
        </AppStack>
        <AppCard>
          <pre :style="{ whiteSpace: 'pre-line' }">{{ props }}</pre>
          <!-- <pre>{{ err }}</pre> -->
        </AppCard>
      </AppStack>
    </div>
  </TheApp>
</template>

<script setup lang="ts">
interface Props {
  error: {
    statusCode: number;
    message: string;
  };
}
const props = defineProps<Props>();

// const err = JSON.parse(props.error.message);
</script>

<style lang="scss">
.sk-TheErrorView {
  padding: var(--mk-size-8);

  pre {
    white-space: pre;
  }
}
</style>
