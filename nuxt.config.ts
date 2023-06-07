// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    // @ts-ignore
    runtimeConfig: {
        public: {
            apiBase: 'https://gerai-api.test/api'
        }
    }
})
