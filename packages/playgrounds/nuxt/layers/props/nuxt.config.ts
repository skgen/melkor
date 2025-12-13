// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  components: [
    {
      path: '#layers/props/app/components',
      pathPrefix: false,
      global: true,
    },
  ],
});
