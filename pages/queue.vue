<template>
    <div class="space-y-6">
        <div class="flex justify-center ">
            <div class="flex items-center space-x-2 text-gray-400 border rounded-full w-auto pl-2 pr-3 py-1 text-sm">
                <Icon name="material-symbols:electric-bolt-rounded"/>
                <p>Powered by <a href="https://gerai.store" class="font-semibold">gerai</a></p>
            </div>
        </div>

        <h1 class="text-lg font-semibold flex items-center space-x-2 text-neutral">
            <Icon name="mdi:ticket-account"/>
            <span>Get in queue by filling up the form</span>
        </h1>

        <form action="POST" @submit.prevent="submitForm" class="space-y-4">
            <FormInput v-model="form.email" :errors="errors" name="email" label="Email" placeholder="E.g: name@gmail.com"></FormInput>
            <FormInput v-model="form.name" :errors="errors" name="name" label="Name" placeholder="So we can call you later"></FormInput>
            <div class="flex space-x-4">
                <FormGroup placeholder="012345678" v-model="form.phone" :errors="errors" name="phone" type="integer" left-append="+60" label="Phone Number"></FormGroup>
                <FormInput v-model="form.identification" :errors="errors" name="identification" label="Identification No." placeholder="Malaysian I/C"></FormInput>
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-gray-500 font-semibold">Issues</span>
                </label>
                <textarea class="textarea textarea-bordered w-full" v-model="form.remark" placeholder="Add some notes here ..."></textarea>
            </div>

            <button type="submit" onclick="submitQueue.showModal()" :disabled="disableSubmit" class="btn btn-neutral w-full">Submit</button>
        </form>

        <dialog id="submitQueue" class="modal">
            <div class="modal-box">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <template v-if="loading">
                    <div class="flex flex-col items-center justify-center space-y-4">
                        <span class="loading loading-spinner loading-lg"></span>
                        <p class="text-gray-500">Submitting your queue</p>
                    </div>
                </template>
                <template v-else>
                    <h3 class="font-bold text-lg text-center">Queue Submitted!</h3>
                    <div class="flex space-x-4 my-4">
                        <div class="flex-1 flex border p-4 rounded-lg items-center justify-center">
                            <QrCode :value="`https://${ subdomain }.gerai.store/waiting?ref=${ queue?.uuid }`" size="200"/>
                            <!-- <NuxtLink :to="`/waiting?ref=${ queue?.uuid }`">
                                <p class="text-sm font-semibold text-primary">View Queue</p>
                            </NuxtLink> -->
                        </div>
                        <div class="flex-1 flex flex-col justify-center items-center">
                            <small class="text-gray-500">Your Number</small>
                            <p class="text-4xl font-bold my-4">{{ queue?.number }}</p>
                            <small class="text-gray-500">{{ vendor?.name }}</small>
                            <small class="text-gray-500">{{ queue?.name }}</small>
                        </div>
                    </div>
                    <div class="border border-yellow-600 bg-yellow-50 rounded-lg py-2 px-4 text-center">
                        <p class="text-yellow-600 font-semibold">Please scan the QR code to keep track of your queue</p>
                    </div>
                </template>
            </div>
        </dialog>

    </div>
</template>

<style lang="scss" scoped>
    .background-custom {
        background: rgb(223,255,242);
        background: linear-gradient(321deg, rgba(223,255,242,1) 0%, rgba(255,252,209,1) 50%, rgba(209,255,253,1) 94%);
    }
</style>

<script setup>
    import QrCode from 'qrcode.vue'

    const form = ref({
        name: '',
        email: '',
        phone: '',
        identification: '',
        remark: ''
    })
    const errors = ref([])

    const queue = ref({})
    const vendor = ref({})
    const loading = ref(false)
    const subdomain = getSubdomain()
    const urlBase = inject('urlBase')

    form.value['vendor'] = subdomain

    const disableSubmit = computed(() => {
        return form.value.name === '' || form.value.email === '' || form.value.phone === '' || form.value.identification === ''
    })

    const submitForm = async() => {
        loading.value = true
        // useGlobalLoader().setLoader(true)
        try {
            await $fetch(urlBase + `queue`, {
                method: 'POST',
                body: form.value
            }).then(res => {
                queue.value = res.data.queue
                vendor.value = res.data.vendor
            })
            setTimeout(() => {
                loading.value = false
            }, 1500);
            // useGlobalLoader().setLoader(false)
        } catch(error) {
            errors.value = error.response._data.errors
            loading.value = false
        }
    }
</script>