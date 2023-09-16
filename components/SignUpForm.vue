<template>
    <div class="space-y-4 w-full text-center">
        <p class="text-md font-bold">Join us now!</p>
        <form action="POST" @submit.prevent="registerSubmit">
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
                    <input v-model="form.password" type="password" placeholder="Password" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                    <label v-if="errors.password" class="label">
                        <span class="label-text-alt text-red-700">{{ errors.password[0] }}</span>
                    </label>
                </div>
                <div>
                    <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" :class="`input input-bordered input-sm w-full max-w-xs ${errors.name ? 'input-error' : ''}`" />
                    <label v-if="errors.password_confirmation" class="label">
                        <span class="label-text-alt text-red-700">{{ errors.password_confirmation[0] }}</span>
                    </label>
                </div>
                <button type="submit" class="btn btn-sm capitalize">Sign up</button>
            </div>
        </form>
        <p class="divider my-1 text-sm">Or</p>
        <a @click.prevent="toggleAuth" class="btn btn-ghost btn-sm capitalize btn-block">I have account</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: []
            }
        },

        methods: {
            toggleAuth() {
                this.$emit('toggleAuth', {
                    toggleAuth: true
                })
            }
        }
    }
</script>