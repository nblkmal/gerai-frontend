// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-icon',
        'nuxt-mapbox',
        '@nuxtjs/robots',
        'nuxt-vue3-google-signin'
    ],
    googleSignIn: {
        clientId: process.env.GOOGLE_CLIENT_ID,
    },
    robots: {
        UserAgent: '*',
        Disallow: '/user',
    },
    mapbox: {
        accessToken: 'pk.eyJ1IjoibmJsa21hbCIsImEiOiJjbGxyZ293aHkwcm1zM2R0aGR3YzU1cGtrIn0.vwZx-2Sq_JKYUcdX5-5qIQ'
    },
    plugins: ['~/plugins/intercept.js', '~/plugins/toast.js', '~/plugins/api.js'],
    // @ts-ignore
    runtimeConfig: {
        public: {
            mode: process.env.APP_ENV,
            devApi: 'http://localhost:8001/api/',
            stagingApi: 'https://manage.api.gerai.store/api/',
            prodApi: 'https://manage.api.gerai.store/api/'
        },
        googleClientId: process.env.GOOGLE_CLIENT_ID,
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
                    {
                        name: 'theme-color',
                        content: '#ffffff' 
                    },
                ],
        },
    },
    css: ['~/assets/style/app.scss'],
    build:{
        transpile: ['vue-toastification']
    }
})
