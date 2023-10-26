<script setup lang="ts">
import {
    GoogleSignInButton,
    type CredentialResponse,
} from "vue3-google-signin";
import { useUserStore } from '~/store/user'
import { useGlobalLoader } from '~/store/loader'

const emit = defineEmits(['errors', 'loading'])

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
    // useGlobalLoader().setLoader(true)
    const { credential } = response;
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

const { $toast } = useNuxtApp()
const config = useRuntimeConfig().public
const url = config.mode === 'development' ? config.devApi : config.stagingApi

const registerSubmit = async (user: RegisterForm) => {
    emit('loading', true)
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
        useUserStore().setUserData(res.user)
        localStorage.setItem('token', res.token)
        useGlobalLoader().setLoader(false)
        emit('loading', false)
    } catch (error) {
        let errors = error.response._data.errors
        emit('errors', errors)
        if ('email' in errors) {
            loginSubmit(user)
        }
    }
}

const loginSubmit = async (user: RegisterForm) => {
    emit('loading', true)
    try {
        const res: User = await $fetch(url + 'auth/login', {
            method: 'POST',
            body: {
                email: user.email,
                password: 'password',
            }
        })
        useUserStore().setUserData(res.user)
        localStorage.setItem('token', res.token)
        // reset form
        // this.form = {
        //     email: '',
        //     password: ''
        // }
        emit('loading', false)
    } catch (error) {
        console.error('error: ', error)
        // let errors = error.response._data.errors
        // console.log('error.response: ', error.response)
        // emit('errors', errors)
    }
}

// handle an error event
const handleLoginError = () => {
    console.error("Login failed");
};
</script>

<style lang="scss">
    #container {
        width: 300px !important;
    }
</style>

<template>
    <GoogleSignInButton
        @success="handleLoginSuccess"
        @error="handleLoginError"
        class="w-90 md:w-auto"
        allowed-parent-origin
    ></GoogleSignInButton>
</template>