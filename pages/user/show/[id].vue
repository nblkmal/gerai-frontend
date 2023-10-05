<template>
    <div class="text-left">
        <h1 class="text-lg font-semibold">Personal Info</h1>

        <form action="POST" @submit.prevent="submitForm">
            <FormInput label="Name" v-model="form.name" :value="user?.name"></FormInput>
            <FormGroup placeholder="xx - xxx xxxx" v-model="form.phone" left-append="+60" label="Phone Number"></FormGroup>
            <button class="px-4 fixed bottom-5 left-0 w-full" type="submit">
                <button class="btn btn-neutral btn-block mt-8">Save</button>
            </button>
        </form>


    </div>
</template>

<script setup>
    import { useUserStore } from '~/store/user'

    const route = useRoute()
    const user_id = route.params.id

    const user = computed(() => {
        return useUserStore().user ? useUserStore().user : null
    })

    const form = ref({
        name: user?.value?.name,
        phone: user?.value?.phone_number ?? ''
    })

    const urlBase = inject('urlBase')

    const url = urlBase + `auth/user/${ user_id }/update`
    const payload = {
        method: 'POST',
        body: form.value
    }

    async function submitForm() {
        // this.loading = true
        const res = await $fetch(url, payload)
        // this.loading = false
    }
</script>