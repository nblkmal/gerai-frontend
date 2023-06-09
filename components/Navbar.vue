<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <a class="btn btn-ghost normal-case text-xl">gerai.io</a>
            <div class="badge badge-accent badge-outline">beta</div>
        </div>

        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a>Be a contributor</a></li>
                <li><a>Category</a></li>
                <li><a>Billboard</a></li>
            </ul>
        </div>

        <div class="navbar-end gap-2">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>

            <input @click="toggleTheme" type="checkbox" class="toggle" :checked="theme === 'dark'" />

            <!-- auth -->
            <div class="dropdown dropdown-end" v-if="Object.keys(user).length === 0">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                    </div>
                </label>
                <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow bg-white">
                    <div class="card-body" v-if="auth === 'login'">
                        <p>Food hunt with us or <a @click.prevent="toggleAuth" class="text-blue-500 cursor-pointer">register here</a></p>
                        <form action="POST" @submit.prevent="loginSubmit">
                            <div class="form-control w-full max-w-xs space-y-4">
                                <input v-model="loginForm.email" type="text" placeholder="Email" class="input input-bordered input-sm w-full max-w-xs" />
                                <input v-model="loginForm.password" type="password" placeholder="Password" class="input input-bordered input-sm w-full max-w-xs" />
                                <button type="submit" class="btn btn-sm capitalize">
                                    <span v-if="!loading">Login</span>
                                    <i v-else class='bx bx-loader-alt bx-spin' ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="card-body" v-if="auth === 'register'">
                        <p>Join us now or <a @click.prevent="toggleAuth" class="text-blue-500 cursor-pointer">login here</a></p>
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
                    </div>
                </div>
            </div>
            
            <div class="dropdown dropdown-end" v-if="Object.keys(user).length !== 0">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                    </div>
                </label>

                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <!-- <p class="px-4 pt-2 font-bold">{{ user.name }}'s Account</p> -->
                    <li>
                        <a class="justify-between font-bold">
                            {{ user.name }}'s Account
                            <!-- <span class="badge">New</span> -->
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li>
                        <a class="hover:bg-red-100 hover:text-red-700" @click.prevent="logout" :href="this.urlBase + '/auth/logout'">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        theme: String
    },

    data() {
        return {
            errors: [],
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            user: {},
            urlBase: useRuntimeConfig().public.apiBase,
            auth: 'register',
            loading: false
        }
    },

    methods: {
        toggleTheme() {
            this.$emit('toggleTheme', true)
        },
        toggleAuth() {
            this.auth = this.auth === 'register' ? 'login' : 'register'
        },
        async logout() {
            const url = this.urlBase + '/auth/register'
            try {
                const res = await $fetch(url, {
                    method: 'POST'
                })
                this.user = {}
                localStorage.removeItem('token')
            } catch (error) {
                this.errors = error.response._data.errors
            }
        },
        async registerSubmit() {
            const url = this.urlBase + '/auth/register'
            try {
                const res = await $fetch(url, {
                    method: 'POST',
                    body: this.registerForm
                })
                this.user = res.user
                localStorage.setItem('token', res.token)
            } catch (error) {
                this.errors = error.response._data.errors
            }
        },
        async loginSubmit() {
            this.loading = true
            const url = this.urlBase + '/auth/login'
            try {
                const res = await $fetch(url, {
                    method: 'POST',
                    body: this.loginForm
                })
                this.user = res.user
                localStorage.setItem('token', res.token)
                this.loading = false
            } catch (error) {
                this.loading = false
                this.errors = error.response._data.errors
            }
        }
    }
}
</script>
