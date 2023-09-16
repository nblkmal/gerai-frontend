// https://nuxt.com/docs/api/configuration/nuxt-config
import storesJson from './content/stores.json'

export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-icon',
        'nuxt-mapbox',
        '@nuxtjs/robots',
        'nuxt-vue3-google-signin',
        '@sidebase/nuxt-auth',
        'nuxt-simple-sitemap',
    ],
    sitemap: {
        urls: async () => {
            const blogPages = await storesJson
            console.log('blogPages: ', blogPages)
            return blogPages.map(page => ({
                loc: `/stores/${page.id}`,
                // update the lastmod
                lastmod: Date.now(),
                changefreq: 'daily',
                priority: 0.8,
            }))
        },
    },
    site: {
        url: process.env.APP_ENV === 'development' ? process.env.AUTH_ORIGIN : process.env.PROD_URL
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/', '/sitemap.xml']
        }
    },
    auth: {
        origin: process.env.AUTH_ORIGIN,
        basePath: '/api/auth'
    },
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
        transpile: ['vue-toastification'],
        postcss: {
            plugins: {
                "postcss-custom-properties": false
            }
        }
    }
})
