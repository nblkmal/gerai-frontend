// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    // @ts-ignore
    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:8000/api'
        }
    },
    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' }
            ]
        }
    }
})
