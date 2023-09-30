<template>
    <div ref="el" data-theme="light" class="min-h-screen">
        <div v-if="loader" class="h-full w-full justify-center z-20 backdrop-blur-sm bg-white/30 fixed">
            <span class="absolute loading loading-dots loading-lg bottom-0 top-0 right-0 left-0 m-auto"></span>
        </div>
        <Navbar :theme="theme"/>

        <!-- breadcrumbs -->
        <!-- <div class="text-xs breadcrumbs">
            <ul>
                <li><a>Home</a></li> 
                <li><a>Documents</a></li> 
                <li>Add Document</li>
            </ul>
        </div> -->

        <!-- <Navbar :theme="theme" @toggleTheme="toggleTheme"/> -->
        
        <div class="pt-20 px-4 md:px-64 text-center md:text-left space-y-4 min-h-screen relative pb-20">
            <!-- <div class="bg-gray-100 rounded-md flex text-left py-3 px-2 space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>This is unreleased beta version of gerai.io</span>
            </div> -->

            <NuxtPage />
            <Help v-if="!hideHelp"/>
        </div>

        <!-- <Footer /> -->
    </div>
</template>

<style lang="scss">
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

      /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>

<script>
import { useGlobalLoader } from '~/store/loader'

export default {
    provide() {
        return {
            urlBase: useRuntimeConfig().public.mode === 'development' ? useRuntimeConfig().public.devApi : useRuntimeConfig().public.stagingApi,
            store: this.vendor
        }
    },

    methods: {
        toggleTheme() {
            this.$refs.el.dataset.theme = this.$refs.el.dataset.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.$refs.el.dataset.theme)
        }
    },

    data() {
        return {
            theme: '',
            urlBase: useRuntimeConfig().public.mode === 'development' ? useRuntimeConfig().public.devApi : useRuntimeConfig().public.stagingApi,
            loader: useGlobalLoader().loader,
            vendor: null
        }
    },

    computed: {
        hideHelp() {
            let current = useRoute().name
            let hide = [
                'stores-product-order',
                'stores-product-id',
                'stores-id',
                'stores-product-checkout-id'
            ]
            return hide.includes(current)
        }
    },

    async mounted() {
        // const login = useAuth().data.value.login_at
        // const now = Date.now()

        // if (now - login < 3000) {
        //     this.$toast.success('Success Login!', {
        //         position: "bottom-center"
        //     })
        // }
        if ('theme' in localStorage) {
            this.$refs.el.dataset.theme = localStorage.theme
            this.theme = localStorage.theme
        }
    }
}
</script>