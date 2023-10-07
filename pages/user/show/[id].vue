<template>
    <div class="text-left">
        <h1 class="text-lg font-semibold mb-4">Personal Info</h1>

        <form action="POST" @submit.prevent="submitForm" class="flex flex-col space-y-4">
            <FormInput :placeholder="user ? user.name : 'Your name'" label="Name" v-model="form.name" :value="user ? user.name : ''"></FormInput>
            <FormGroup :placeholder="user ? user.phone_number : 'xx xxxx'" v-model="form.phone" left-append="+60" label="Phone Number"></FormGroup>

            <button class="px-4 fixed bottom-5 left-0 w-full" type="submit">
                <button class="btn btn-neutral btn-block mt-8">
                    <span v-if="loading" class="loading loading-dots loading-xs"></span>
                    <span v-else>Save</span>
                </button>
            </button>
        </form>


    </div>
</template>

<script setup>
    import { useUserStore } from '~/store/user'

    const route = useRoute()
    const user_id = route.params.id

    const loading = ref(false)

    const user = computed(() => {
        return useUserStore().user ? useUserStore().user : null
    })

    const form = ref({
        name: user?.value?.name ?? '',
        phone: user?.value?.phone_number ?? ''
    })

    const urlBase = inject('urlBase')

    const url = urlBase + `auth/user/${ user_id }/update`

    async function submitForm() {
        // sync form with user
        form.value.name = form.value.name === '' ? user.value.name : form.value.name
        form.value.phone = form.value.phone === '' ? user.value.phone_number : form.value.phone

        const payload = {
            method: 'POST',
            body: form.value
        }
        loading.value = true
        try {
            await $fetch(url, payload)
            loading.value = false
        } catch(error) {
            console.log('error: ', error)
            loading.value = false
        }
    }
</script>