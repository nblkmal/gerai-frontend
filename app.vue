<template>
    <div ref="el" data-theme="light">
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
        
        <div class="pt-20 md:py-4 px-4 md:px-20 text-center md:text-left space-y-4 min-h-screen relative">
            <div class="bg-gray-100 rounded-md flex text-left py-3 px-2 space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>This is unreleased beta version of gerai.io</span>
            </div>
            <NuxtPage />
            <Help v-if="!hideHelp"/>
        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    methods: {
        toggleTheme() {
            this.$refs.el.dataset.theme = this.$refs.el.dataset.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.$refs.el.dataset.theme)
        }
    },

    data() {
        return {
            theme: '',
            urlBase: useRuntimeConfig().public.mode === 'development' ? useRuntimeConfig().public.devApi : useRuntimeConfig().public.stagingApi
        }
    },

    computed: {
        hideHelp() {
            let current = useRoute().name
            let hide = [
                'stores-product-order',
                'stores-id'
            ]
            return hide.includes(current)
        }
    },

    async mounted() {
        if ('theme' in localStorage) {
            this.$refs.el.dataset.theme = localStorage.theme
            this.theme = localStorage.theme
        }
    }
}
</script>