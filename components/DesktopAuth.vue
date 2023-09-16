<template>
    <div class="hidden md:block dropdown dropdown-end" v-if="user === null">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div v-if="!loading" class="w-10 rounded-full">
                <!-- <img src="" /> -->
                <Avatar 
                    :size="80" 
                    variant="bauhaus"
                    name="Mujahid Anuar" 
                    :colors="colors" 
                />
            </div>
            <i v-else class='bx bx-loader-alt bx-spin bx-md' ></i>
        </label>
        <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow bg-white border border-neutral-200 z-10">
            <div class="card-body" v-if="auth === 'login'">
                <LoginForm @toggleAuth="toggleAuth"></LoginForm>
            </div>
            <div class="card-body" v-if="auth === 'register'">
                <SignUpForm @toggleAuth="toggleAuth"></SignUpForm>
            </div>
        </div>
    </div>

    <div class="hidden md:block dropdown dropdown-end" v-if="user !== null">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div v-if="!loading" class="w-10 rounded-full">
                <!-- <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" /> -->
                <Avatar 
                    :size="80" 
                    variant="bauhaus"
                    name="Mujahid Anuar" 
                    :colors="colors" 
                />
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
                <a class="flex justify-between hover:bg-red-100 hover:text-red-700" @click.prevent="logout">
                <!-- <a class="flex justify-between hover:bg-red-100 hover:text-red-700" @click.prevent="logout" :href="this.urlBase + '/auth/logout'"> -->
                    <span v-if="!loading">Logout</span>
                    <span v-else class="loading loading-dots loading-md"></span>
                    <i class='hover:text-red-700 bx bx-log-out bx-flip-horizontal' ></i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useUserStore } from '~/store/user'
    const { $toast } = useNuxtApp()

    const mastanahStatus = useAuth().status.value
    const mastanahUser = useAuth().data.value ? useAuth().data.value.user : null

    const loading = ref(false)

    const user = computed(() => {
        return mastanahStatus === 'authenticated' ? mastanahUser : useUserStore().user
    })

    async function logout() {
        loading.value = true
        $toast.info('Logging out!', {
            position: "bottom-center"
        })
        if (mastanahStatus === 'authenticated') {
            useAuth().signOut()
        } else {
            try {
                $toast.success('Logged out!', {
                    position: "bottom-center"
                })
                useUserStore().setUserData(null)
                localStorage.removeItem('token')
                loading.value = false
            } catch (error) {
                console.log('error.response: ', error.response)
                // this.errors = error.response._data.errors
                loading.value = false
            }
        }
    }
</script>

<script>
import { useUserStore } from '~/store/user'
import { mapState } from 'pinia'
import Avatar from "vue-boring-avatars"

export default {
    components: { Avatar },

    data() {
        return {
            colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
            auth: 'login'
        }
    },

    methods: {
        toggleAuth() {
            this.auth = this.auth === 'register' ? 'login' : 'register'
        }
    }
}
</script>