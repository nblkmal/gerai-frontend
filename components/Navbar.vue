<template>
    <div class="navbar backdrop-blur-sm bg-white/30 fixed z-10">
        <div class="md:hidden collapse" id="navbar-collapse">
            <input type="checkbox" name="my-accordion-1" id="navbar-collapse-btn"/> 
            <div class="collapse-title flex items-center">
                <svg v-if="brand === ''" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                <NuxtLink class="navbar-start flex items-center w-full" to="/">
                    <div v-if="brand !== ''" class="font-bold normal-case text-xl">
                        {{ brand }}
                        <span class="font-semibold text-sm self-end text-gray-500 pl-2">by gerai</span>
                    </div>
                    <div v-else class="font-bold normal-case text-xl pl-4">gerai</div>
                    <div class="hidden md:block badge badge-accent badge-outline">beta</div>
                </NuxtLink>
            </div>
            <div class="collapse-content"> 
                <NavbarMenus @click="closeCollapse" class-name="dropdown-content space-y-4 font-semibold"></NavbarMenus>
            </div>

        </div>

        <div class="hidden md:flex navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>

                <NavbarMenus tabindex="0" class-name="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-4"></NavbarMenus>
            </div>
            <NuxtLink class="navbar-start flex items-center" to="/">
                <a class="btn btn-ghost normal-case text-xl">gerai.io</a>
                <div class="hidden md:block badge badge-accent badge-outline">beta</div>
            </NuxtLink>
        </div>

        <div class="navbar-center hidden lg:flex">
            <NavbarMenus class-name="menu menu-horizontal px-1"></NavbarMenus>
        </div>

        <div class="navbar-end gap-2 self-start mt-2 mr-2">
            <!-- <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div> -->

            <!-- hide for the moment -->
            <label class="hidden swap swap-rotate border p-2 rounded-full">
                <!-- this hidden checkbox controls the state -->
                <input @click="toggleTheme" type="checkbox" :checked="theme === 'dark'"/>
                <!-- moon icon -->
                <i class='swap-on bx bxs-moon'></i>
                <!-- sun icon -->
                <i class='swap-off bx bx-sun' ></i>
            </label>

            <template v-if="user !== null">
                <span v-if="!loading" class="hidden md:block">{{ user.name }}</span>
                <i v-else class='bx bx-loader-alt bx-spin' ></i>
                <!-- <div v-else class="skeleton h-2 w-2"></div> -->
            </template>

            <!-- vendor config -->
            <!-- <NuxtLink v-if="user?.vendor" :to="`/user/store/${ user?.id }`">
                <Icon name="bx:store" :class="`h-6 w-6 rouned-full group-hover:text-primary text-gray-500`"/>
            </NuxtLink> -->
            <!-- put modal here -->
            <Icon v-else name="bx:store" :class="`h-6 w-6 rouned-full group-hover:text-primary text-gray-300`"/>

            <!-- add to cart -->
            <Cart></Cart>

            <!-- auth mobile -->
            <MobileAuth class="block md:hidden"></MobileAuth>

            <!-- auth desktop-->
            <DesktopAuth class="hidden md:block"></DesktopAuth>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .digit-custom {
        padding-left: 10px;
        padding-bottom: 3px;
        caret-color: transparent;
    }

    .collaps {
        @apply border-none;
    }

    .collapse-title {
        @apply ml-4;
        padding: 0 !important;
    }
</style>

<script>
import { useUserStore } from '~/store/user'
import { useCartStore } from '~/store/cart'
import { mapState } from 'pinia'
import Avatar from "vue-boring-avatars"

export default {
    components: { Avatar },
    computed: {
        ...mapState(useUserStore, ['user']),
        ...mapState(useCartStore, ['cart']),
    },

    props: {
        theme: String
    },

    data() {
        return {
            colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
            verifyForm: {
                first: '',
                second: '',
                third: '',
                forth: '',
                fifth: '',
            },
            urlBase: useRuntimeConfig().public.mode === 'development' ? useRuntimeConfig().public.devApi : useRuntimeConfig().public.stagingApi,
            auth: 'login',
            loading: false,
            subdomain: '',
            brand: ''
        }
    },

    mounted() {
        this.initialize()
        this.checkSubdomain()
    },

    methods: {
        closeCollapse() {
            let element = document.getElementById('navbar-collapse-btn')
            element.click()
        },

        async checkSubdomain() {
            const subdomain = getSubdomain()
            // check if subdomain is not null
            if (subdomain !== null) {
                this.subdomain = subdomain
                // check if subdomain exists in list of gerai
                const payload = {
                    method: 'POST',
                    body: {
                        subdomain: this.subdomain
                    }
                }

                try {
                    const result = await $fetch(`${ this.urlBase }check-subdomain`, payload)
                    this.brand = result.data.name
                } catch (error) {
                    console.error('error: ', error)
                    // throw createError({ statusCode: 404, statusMessage: "Page Not Found" })
                }
            }
        },

        withSubdomain(subdomain) {
            // check if subdomain exists and same, dont proceed
            const route = useRoute()
            const domain = 'gerai.io'
            const path = route.fullPath
            if (process.client) window.location.href = 'https://' + subdomain + '.' + domain + path;
        },

        toggleTheme() {
            this.$emit('toggleTheme', true)
        },

        async initialize() {
            const url = this.urlBase + 'auth/initialize'
            if (localStorage.getItem("token") !== null) {
                try {
                    const res = await $fetch(url)
                    useUserStore().setUserData(res.user)
                } catch (error) {
                    this.errors = error.response._data.errors
                }
            }
        },
        async logout() {
            this.loading = true
            // const url = this.urlBase + '/auth/register'
            try {
                // const res = await $fetch(url, {
                //     method: 'POST'
                // })
                this.$toast.success('Logged out!')
                useUserStore().setUserData(null)
                localStorage.removeItem('token')
                this.loading = false
            } catch (error) {
                this.errors = error.response._data.errors
                this.loading = false
            }
        },
        async registerSubmit() {
            const url = this.urlBase + '/auth/register'
            try {
                const res = await $fetch(url, {
                    method: 'POST',
                    body: this.registerForm
                })
                useUserStore().setUserData(res.user)
                this.$toast.info('Registered succesfully!')
                this.$toast.success('Logged in as ' + useUserStore().user.name + '!')
                localStorage.setItem('token', res.token)
            } catch (error) {
                this.errors = error.response._data.errors
            }
        }
    }
}
</script>
