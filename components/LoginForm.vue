<template>
    <div class="space-y-4 w-full text-center">
        <p class="text-md font-bold">Let's food hunt with us</p>

        <!-- hide login by form -->
        <!-- <form action="POST" @submit.prevent="loginSubmit">
            <div class="form-control w-full md:max-w-xs space-y-4">
                <input v-model="form.email" type="text" placeholder="Email" class="input input-bordered input-sm w-full md:max-w-xs" />
                <input v-model="form.password" type="password" placeholder="Password" class="input input-bordered input-sm w-full md:max-w-xs" />
                <button type="submit" class="btn btn-sm capitalize">
                    <span v-if="!loading">
                        Sign in
                    </span>
                    <span v-else class="loading loading-dots loading-md"></span>
                </button>
            </div>
        </form> -->

        <GoogleSSO class="mt-4" @loading="emitLoading"></GoogleSSO>

        <button @click="signIn('mastanah')" class="btn btn-primary text-white btn-md capitalize w-full">
            <span v-if="!loading" class="flex">
                <span>Sign in with Mastanah</span>
                <!-- <img src="/mastanah-logo.svg" alt="" height="40" width="40" class="border border-black"> -->
            </span>
            <span v-else class="loading loading-dots loading-md"></span>
        </button>

        <!-- hide sign up option -->
        <!-- <div class="divider my-1 text-sm">Or</div>
        <a @click.prevent="toggleAuth" class="btn btn-ghost btn-sm capitalize btn-block">Create account</a> -->

        <!-- for digit verification -->
        <!-- <div class="flex justify-center space-x-2">
            <input id="firstDigit" v-model="verifyForm.first" type="text" maxlength="1" class="border rounded-md h-8 w-8 digit-custom"/>
            <input id="secondDigit" v-model="verifyForm.second" type="text" maxlength="1" class="border rounded-md h-8 w-8 digit-custom"/>
            <input id="thirdDigit" v-model="verifyForm.third" type="text" maxlength="1" class="border rounded-md h-8 w-8 digit-custom"/>
            <input id="forthDigit" v-model="verifyForm.forth" type="text" maxlength="1" class="border rounded-md h-8 w-8 digit-custom"/>
            <input id="fifthDigit" v-model="verifyForm.fifth" type="text" maxlength="1" class="border rounded-md h-8 w-8 digit-custom" autofocus/>
        </div> -->
    </div>
</template>

<script setup>
    const { signIn } = useAuth()
</script>

<script>
import { useUserStore } from '~/store/user'
import { mapState } from 'pinia'

export default {
    computed: {
        ...mapState(useUserStore, ['user'])
    },

    data() {
        return {
            urlBase: useRuntimeConfig().public.mode === 'development' ? useRuntimeConfig().public.devApi : useRuntimeConfig().public.stagingApi,
            form: {
                email: '',
                password: ''
            },
            errors: [],
            loading: false
        }
    },

    methods: {
        toggleAuth() {
            this.$emit('toggleAuth', {
                toggleAuth: true
            })
        },

        emitLoading(data) {
            this.loading = data
        },

        emitErrors() {

        },

        async loginSubmit() {
            this.loading = true
            const url = this.urlBase + '/auth/login'
            try {
                const res = await $fetch(url, {
                    method: 'POST',
                    body: this.form
                })
                useUserStore().setUserData(res.user)
                this.$toast.success('Logged in as ' + useUserStore().user.name + '!')
                localStorage.setItem('token', res.token)
                // reset form
                this.form = {
                    email: '',
                    password: ''
                }
                this.loading = false
            } catch (error) {
                this.loading = false
                this.errors = error.response._data.errors
            }
        }
    }
}
</script>