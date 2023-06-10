<template>
    <div ref="el" :data-theme="theme">
        <Navbar :theme="theme" @toggleTheme="toggleTheme"/>
            <div class="px-4">
                <div class="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>This is unreleased beta version of gerai.io</span>
                </div>
            </div>
            <div class="md:py-4 md:px-20 text-center md:text-left space-y-4 min-h-screen">
                <NuxtPage :user="user" />
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
        },
        async initialize() {
            const url = this.urlBase + '/auth/initialize'
            console.log('this.urlBase: ', this.urlBase)
            if (localStorage.getItem("token") !== null) {
                try {
                    const res = await $fetch(url)
                    this.user = res.user
                } catch (error) {
                    this.errors = error.response._data.errors
                }
            }
        }
    },

    data() {
        return {
            theme: '',
            user: {},
            urlBase: useRuntimeConfig().public.apiBase
        }
    },

    async mounted() {
        if ('theme' in localStorage) {
            this.$refs.el.dataset.theme = localStorage.theme
            this.theme = localStorage.theme
        }

        this.initialize()
    }
}
</script>