// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'PixelArt - Nuxt 3',
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true }
})
