<template>
    <div ref="el" :data-theme="theme">
        <Navbar :theme="theme" @toggleTheme="toggleTheme"/>
            <NuxtPage />
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
            theme: ''
        }
    },

    mounted() {
        if ('theme' in localStorage) {
            this.$refs.el.dataset.theme = localStorage.theme
            this.theme = localStorage.theme
        }
    }
}
</script>