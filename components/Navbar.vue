<template>
    <div class="navbar bg-base-100">
        <div class="md:hidden collapse" id="navbar-collapse" @click="openCollapse">
            <input type="checkbox" name="my-accordion-1" /> 
            <div class="collapse-title flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                <NuxtLink class="navbar-start flex items-center w-full" to="/">
                    <div v-if="subdomain !== ''" class="font-bold normal-case text-xl pl-4">
                        {{ subdomain }}
                        <span class="font-semibold text-sm self-end text-gray-500 pl-2">by gerai</span>
                    </div>
                    <div v-else class="font-bold normal-case text-xl pl-4">gerai</div>
                    <div class="hidden md:block badge badge-accent badge-outline">beta</div>
                </NuxtLink>
            </div>
            <div class="collapse-content"> 
                <NavbarMenus @click="closeCollapse" class-name="dropdown-content space-y-2 text-gray-500"></NavbarMenus>
            </div>

        </div>

        <div class="hidden md:flex navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>

                <NavbarMenus class-name="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-4"></NavbarMenus>
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

            <!-- auth mobile -->
            <MobileAuth></MobileAuth>

            <!-- auth desktop-->
            <div class="hidden md:block dropdown dropdown-end" v-if="user === null">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div v-if="!loading" class="w-10 rounded-full">
                        <img src="data:image/jpeg;base64,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" />
                    </div>
                    <i v-else class='bx bx-loader-alt bx-spin bx-md' ></i>
                </label>
                <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow bg-white border border-neutral-200 z-10">
                    <div class="card-body" v-if="auth === 'login'">
                        <LoginForm></LoginForm>
                    </div>
                    <div class="card-body" v-if="auth === 'register'">
                        <p class="text-md font-bold">Join us now!</p>
                        <form action="POST" @submit.prevent="registerSubmit">
                            <div class="form-control w-full max-w-xs space-y-4">
                                <div>
                                    <input v-model="registerForm.name" type="text" placeholder="Username" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.name" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.name[0] }}</span>
                                    </label>
                                </div>
                                <div>
                                    <input v-model="registerForm.email" type="text" placeholder="Email" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.email" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.email[0] }}</span>
                                    </label>
                                </div>
                                <div>
                                    <input v-model="registerForm.password" type="password" placeholder="Password" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.password" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.password[0] }}</span>
                                    </label>
                                </div>
                                <div>
                                    <input v-model="registerForm.password_confirmation" type="password" placeholder="Confirm Password" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.password_confirmation" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.password_confirmation[0] }}</span>
                                    </label>
                                </div>
                                <button type="submit" class="btn btn-sm capitalize">Sign up</button>
                            </div>
                        </form>
                        <p class="divider my-1 text-sm">Or</p>
                        <a @click.prevent="toggleAuth" class="btn btn-ghost btn-sm capitalize">I have account</a>
                    </div>
                </div>
            </div>
            
            <div class="hidden md:block dropdown dropdown-end" v-if="user !== null">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div v-if="!loading" class="w-10 rounded-full">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                    </div>
                    <span v-else class="loading loading-dots loading-md"></span>
                </label>

                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <!-- <p class="px-4 pt-2 font-bold">{{ user.name }}'s Account</p> -->
                    <li>
                        <NuxtLink to="/user/profile">
                            {{ user.name }}'s Account
                        </NuxtLink>
                    </li>
                    <li><a>Settings</a></li>
                    <li class="">
                        <a class="flex justify-between hover:bg-red-100 hover:text-red-700" @click.prevent="logout" :href="this.urlBase + '/auth/logout'">
                            <span v-if="!loading">Logout</span>
                            <span v-else class="loading loading-dots loading-md"></span>
                            <i class='hover:text-red-700 bx bx-log-out bx-flip-horizontal' ></i>
                        </a>
                    </li>
                </ul>
            </div>
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
import { mapState } from 'pinia'

export default {
    computed: {
        ...mapState(useUserStore, ['user'])
    },

    props: {
        theme: String
    },

    data() {
        return {
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
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
            subdomain: ''
        }
    },

    mounted() {
        this.initialize()
        this.checkSubdomain()
    },

    methods: {
        closeCollapse() {
            let element = document.getElementById('navbar-collapse')
            element.classList.add('collapse-close')
        },

        openCollapse() {
            console.log('hit')
            let element = document.getElementById('navbar-collapse')
            element.classList.forEach(data => {
                if (data === 'collapse-close') {
                    element.classList.remove('collapse-close')
                }
            })
            // element.classList.find(data => {
            //     if (data === 'collapse-close') {
            //         return true
            //     } else {
            //         return false
            //     }
            // })
            // element.classList.add('collapse-close')
            // setTimeout(() => {
            //     element.classList.remove('collapse-close')
            // }, 300)
        },

        checkSubdomain() {
            const subdomain = getSubdomain()
            console.log('subdomain: ', subdomain)
            // check if subdomain is not null
            if (subdomain !== null) {
                this.subdomain = subdomain
                // check if subdomain exists in list of gerai

                // if not exist throw error 404
                // throw createError({ statusCode: 404, statusMessage: "Page Not Found" })
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
        toggleAuth() {
            this.auth = this.auth === 'register' ? 'login' : 'register'
        },
        async initialize() {
            const url = this.urlBase + '/auth/initialize'
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
