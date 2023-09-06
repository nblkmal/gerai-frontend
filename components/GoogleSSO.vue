<script setup lang="ts">
import {
    GoogleSignInButton,
    type CredentialResponse,
} from "vue3-google-signin";
import { useUserStore } from '~/store/user'
// import { provide, inject } from 'vue'
// import type { InjectionKey } from 'vue'

interface RegisterForm {
    email: string,
    name: string
}

interface User {
    user: {
        email: string,
        name: string,
    },
    token: string
}

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
    const { credential } = response;
    // let user: RegisterForm = 
    let user = {} as RegisterForm

    if (credential) {
        user = await $fetch('/api/google-login', {
            method: 'POST',
            body: {
                token: credential
            }
        })
        
        if (user) {
            registerSubmit(user)
        }
    }
};

const registerSubmit = async (user: RegisterForm) => {
    const config = useRuntimeConfig().public
    const url = config.mode === 'development' ? config.devApi : config.stagingApi
    // const toast = inject('toast') as InjectionKey<string>
    try {
        const res: User = await $fetch(url + 'auth/register', {
            method: 'POST',
            body: {
                name: user.name,
                email: user.email,
                password: 'password',
                password_confirmation: 'password',
            }
        })
        console.log('res: ', res)
        useUserStore().setUserData(res.user)
        // toast.info('Registered succesfully!')
        // this.$toast.success('Logged in as ' + useUserStore().user.name + '!')
        localStorage.setItem('token', res.token)
    } catch (error) {
        // this.errors = error.response._data.errors
    }
}

// handle an error event
const handleLoginError = () => {
    console.error("Login failed");
};
</script>

<template>
    <GoogleSignInButton
        @success="handleLoginSuccess"
        @error="handleLoginError"
    ></GoogleSignInButton>
</template>