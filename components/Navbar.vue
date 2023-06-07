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

            <!-- login -->
            <!-- <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn m-1">Click</label>
                <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow bg-white">
                    <div class="card-body">
                        <div class="form-control w-full max-w-xs space-y-4">
                            <input type="text" placeholder="Username" class="input input-bordered input-sm w-full max-w-xs" />
                            <input type="text" placeholder="Password" class="input input-bordered input-sm w-full max-w-xs" />
                            <button class="btn btn-sm capitalize">Login</button>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- register -->
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn m-1">Register</label>
                <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow bg-white">
                    <div class="card-body">
                        <p>Join us now!</p>
                        <form action="POST" @submit.prevent="submitForm">
                            <div class="form-control w-full max-w-xs space-y-4">
                                <div>
                                    <input v-model="form.name" type="text" placeholder="Username" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.name" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.name[0] }}</span>
                                    </label>
                                </div>
                                <div>
                                    <input v-model="form.email" type="text" placeholder="Email" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.email" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.email[0] }}</span>
                                    </label>
                                </div>
                                <div>
                                    <input v-model="form.password" type="text" placeholder="Password" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                                    <label v-if="errors.password" class="label">
                                        <span class="label-text-alt text-red-700">{{ errors.password[0] }}</span>
                                    </label>
                                </div>
                                <div>
                                    <input v-model="form.password_confirmation" type="text" placeholder="Confirm Password" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
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
            
            <!-- <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                    </div>
                </label>

                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                    <a class="justify-between">
                        Profile
                        <span class="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div> -->
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
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },

    methods: {
        toggleTheme() {
            this.$emit('toggleTheme', true)
        },
        async submitForm() {
            const url = useRuntimeConfig().public.apiBase + '/auth/register'
            console.log('url: ', url)
            try {
                const res = await $fetch(url, {
                    method: 'POST',
                    body: this.form
                })
                console.log('res: ', res)
            } catch (error) {
                this.errors = error.response._data.errors
                console.log('this.errors: ', this.errors)
            }
        }
    }
}
</script>
