// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    plugins: ['~/plugins/intercept.js', '~/plugins/toast.js', '~/plugins/api.js'],
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
            ],
            title: 'gerai',
                meta: [
                    {
                        name: 'description',
                        content: 'Search for your best gerai here!' 
                    },
                ],
        },
    },
    css: ['~/assets/style/app.scss'],
    build:{
        transpile: ['vue-toastification']
    }
})
