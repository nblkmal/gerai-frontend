<template>
    <span class="text-sm">
        {{ user?.name }}
    </span>
    <label tabindex="0" class="block md:hidden btn btn-ghost btn-circle avatar" onclick="mobile_auth.showModal()">
        <div v-if="!loading" class="w-10 rounded-full">
            <Avatar 
                :size="80" 
                variant="bauhaus"
                name="Mujahid Anuar" 
                :colors="colors" 
            />
        </div>
        <i v-else class='bx bx-loader-alt bx-spin bx-md' ></i>
    </label>
    <dialog id="mobile_auth" class="modal">
        <form method="dialog" class="modal-box flex flex-col justify-center items-center">
            <template v-if="user === null">
                <LoginForm></LoginForm>
                <button @click="ping" class="border rounded-md py-1 px-2 mt-4">Ping</button>
            </template>
            <template v-else>
                <div class="bg-green-100 p-4 w-full rounded text-center flex items-center justify-center space-x-2">
                    <Icon name="solar:verified-check-bold-duotone" color="green" height="30" width="30"/>
                    <span class="font-semibold">Logged in as {{ user?.name }}</span>
                </div>
                <small class="text-gray-500 mt-4">Click outside to close or <button @click="logout" class="bg-red-100 px-2 py-1 rounded text-red-700">Log me out</button></small>
            </template>

            <!-- <div class="border border-red-400 bg-red-400 rounded mt-4 w-full text-white px-2 py-1">
                {{ errors?.name[0] }}
            </div> -->
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style lang="scss" scoped>
    #gsi_76083_141705 {
        // @apply bg-black;
        background-color: black !important;
    }
</style>

<script setup>
    import Avatar from "vue-boring-avatars"
    import { ref } from 'vue'
    import { useUserStore } from '~/store/user'
    const { $toast } = useNuxtApp()

    const mastanahStatus = useAuth().status.value
    const mastanahUser = useAuth().data.value ? useAuth().data.value.user : null

    const errors = ref({})
    const loading = ref(false)

    const user = computed(() => {
        return mastanahStatus === 'authenticated' ? mastanahUser : useUserStore().user
    })

    // function emitLoading(data) {
    //     loading.value = data
    // }

    // function emitErrors(data) {
    //     console.log('erros: ', data)
    //     errors.value = data
    // }

    const urlBase = inject('urlBase')
    async function ping() {
        const result = await $fetch(`${ urlBase }ping`)
        $toast.info(result.message, {
            position: "bottom-center"
        })
    }

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