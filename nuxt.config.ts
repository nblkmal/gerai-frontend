// https://nuxt.com/docs/api/configuration/nuxt-config
import storesJson from './content/stores.json'

export default defineNuxtConfig({
    // vite: { // @ts-ignore
    //     ssr: { noExternal: ["moment"] }
    // },
    ssr: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-icon',
        '@nuxtjs/robots',
        'nuxt-vue3-google-signin',
        '@sidebase/nuxt-auth',
        // 'nuxt-simple-sitemap'
        // 'nuxt-scheduler'
    ],
    // sitemap: {
    //     urls: async () => {
    //         const blogPages = await storesJson
    //         return blogPages.map(page => ({
    //             loc: `/stores/${page.id}`,
    //             // update the lastmod
    //             lastmod: new Date().toISOString(),
    //             changefreq: 'daily',
    //             priority: 0.8,
    //         }))
    //     },
    // },
    // site: {
    //     url: process.env.APP_ENV === 'development' ? process.env.AUTH_ORIGIN : process.env.PROD_URL
    // },
    // nitro: {
    //     prerender: {
    //         crawlLinks: true,
    //         routes: ['/']
    //     }
    // },
    // auth: {
    //     basePath: '/api/auth'
    // },
    googleSignIn: {
        clientId: process.env.GOOGLE_CLIENT_ID,
    },
    // robots: {
    //     rules: {
    //         UserAgent: '*',
    //         Disallow: '/user',
    //     }
    // },
    // mapbox: {
    //     accessToken: 'pk.eyJ1IjoibmJsa21hbCIsImEiOiJjbGxyZ293aHkwcm1zM2R0aGR3YzU1cGtrIn0.vwZx-2Sq_JKYUcdX5-5qIQ'
    // },
    plugins: ['~/plugins/intercept.js', '~/plugins/toast.js', '~/plugins/api.js'],
    // @ts-ignore
    runtimeConfig: {
        public: {
            mode: process.env.APP_ENV,
            devApi: 'https://mastanah-portal-laravel.test/api/gerai/',
            stagingApi: 'https://manage.api.gerai.store/api/gerai/',
            prodApi: 'https://manage.api.gerai.store/api/gerai/'
        },
        passport: {
            mastanahBaseUrl: process.env.MASTANAH_PASSPORT_BASE_URL,
            mastanahCallbackUrl: process.env.MASTANAH_CALLBACK_URL,
            mastanahClientId: process.env.MASTANAH_PASSPORT_CLIENT_ID,
            mastanahClientSecret: process.env.MASTANAH_PASSPORT_CLIENT_SECRET
        },
        googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' }
            ],
            title: 'Gerai | We suggest you place to eat!',
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
