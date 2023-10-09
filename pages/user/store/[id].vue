<template>
    <div class="flex bg-yellow-50 border border-yellow-500 rounded-md px-4 py-2 items-center space-x-2">
        <Icon name="iconamoon:star-duotone" color="orange" />
        <span class="font-semibold text-yellow-700">Configure your gerai as owner</span>
    </div>

    <!-- <span v-if="useGlobalLoader().loader" class="loading loading-dots loading-lg"></span> -->

    <div class="flex justify-center pt-8">
        <div v-if="logoPreview" class="indicator border rounded-full h-24 w-24">
            <span @click="removeLogo" class="indicator-item border border-red-500 bg-red-50 p-1 rounded-full w-8 h-8 flex items-center justify-center">
                <Icon name="solar:trash-bin-2-bold" color="red" />
            </span>
            <img class="rounded-full object-cover w-full" :src="logoPreview" alt="">
        </div>
        <label v-else for="logo" :class="`border bg-gray-50 rounded-full p-8 h-24 w-24`">
            <Icon name="solar:upload-line-duotone" class="text-gray-600" />
        </label>

        <input ref="logo" v-on:change="handleFileUpload()" id="logo" type="file" class="hidden"/>
    </div>
    <h1 class="text-lg font-semibold mb-12 mt-6 flex items-center justify-center space-x-2">
        <span>{{ store?.name }}</span>
        <Icon name="bxs:badge-check" class="text-green-600"/>
    </h1>

    <form action="POST" @submit.prevent="submitForm" class="flex flex-col space-y-4">
        <div class="text-left flex flex-col space-y-4">
            <FormInput v-model="form.description" no-border label="Description" :placeholder="store?.description"></FormInput>

            <div class="flex space-x-2">
                <div onclick="stateModal.showModal()" class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-gray-500 font-semibold">State</span>
                    </label>
                    <input type="text" :placeholder="location.state ?? 'Select state'" class="input w-full">
                </div>

                <div :onclick="(form.state !== null && citySelection.length !== 0) ? 'cityModal.showModal()' : ''" class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-gray-500 font-semibold">City</span>
                    </label>
                    <input v-if="citySelection.length !== 0" type="text" :placeholder="location.city ?? 'Select city'" class="input w-full">
                    <input v-else disabled placeholder="No city" class="input w-full">
                </div>

                <dialog id="stateModal" class="modal">
                    <div class="modal-box py-4">
                            <!-- <form method="dialog">
                                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form> -->
                        <div class="modal-action h-40 w-full mt-0">
                            <form method="dialog" class="w-full">
                                <button @click="selectState(item.id)" v-for="item in stateCity" :key="item.id" class="w-full py-2 px-4 font-semibold text-gray-500">
                                    {{ item.name }}
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <dialog id="cityModal" class="modal">
                    <div class="modal-box py-4">
                        <div class="modal-action h-40 w-full mt-0">
                            <form method="dialog" class="w-full">
                                <button @click="selectCity(item.id)" v-for="item in citySelection" :key="item.id" class="w-full py-2 px-4 font-semibold text-gray-500">
                                    {{ item.name }}
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            <FormInput v-model="form.mapsUrl" no-border label="Google Maps URL" placeholder="Paste link here"></FormInput>
        </div>

        <button class="px-4 fixed bottom-5 left-0 w-full" type="submit">
            <button class="btn btn-neutral btn-block mt-8">
                <span v-if="loading" class="loading loading-dots loading-xs"></span>
                <span v-else>Save</span>
            </button>
        </button>
    </form>
</template>

<script setup>
    import { useGlobalLoader } from '~/store/loader'

    const route = useRoute()
    const loading = ref(false)
    const user_id = route.params.id
    const urlBase = inject('urlBase')
    const getCountryDataUrl = urlBase + 'country'
    const getStoreUrl = urlBase + `auth/user/${ user_id }/store`

    onMounted(() => {
        // useGlobalLoader().setLoader(true)
        getStore()
        getStateCity()
    })

    const form = ref({
        name: null,
        description: null,
        mapsUrl: null,
        // logo: null,
        state_id: null,
        city_id: null
    })

    const location = ref({
        city: null,
        state: null
    })

    const store = ref({})
    async function getStore() {
        const result = await $fetch(getStoreUrl)
        store.value = result.data
    }

    const stateCity = ref ({})
    async function getStateCity() {
        const result = await $fetch(getCountryDataUrl)
        stateCity.value = result.data

        syncState(store.value.state_id)
        syncCity(store.value.city_id)
        useGlobalLoader().setLoader(false)
    }

    const logo = ref(null)
    const logoPreview = ref(null)
    const handleFileUpload = async() => {
        // form.value.logo = logo.value.files
        uploadLogo(logo.value.files[0])
        let reader = new FileReader()
        reader.onload = (e) => {
            logoPreview.value = e.target.result
        }
        reader.readAsDataURL(logo.value.files[0])
    }

    function removeLogo() {
        logo.value = null
        logoPreview.value = null
    }

    function syncState(id) {
        stateCity.value.find(state => {
            if (state.id === id){
                form.value.state_id = state.id
                location.value.state = state.name
                populateCity(state.id)
            }
        })
    }

    function selectState(id) {
        syncState(id)
    }

    function syncCity(id) {
        citySelection.value.find(city => {
            if (city.id == id) {
                form.value.city_id = city.id
                location.value.city = city.name
            }
        })
    }

    function selectCity(id) {
        syncCity(id)
    }

    const citySelection = ref({})

    function populateCity(id) {
        stateCity.value.filter(state => {
            if (state.id == id) {
                citySelection.value = state.cities
            }
        })
    }

    const uploadLogo = async(file) => {
        try {
            const formData = new FormData()
            formData.append('logo', file)
            await $fetch(urlBase + `vendors/${ store?.value.id }/update`, {
                method: 'POST',
                body: formData
            })
        } catch(error) {
            console.log('error: ', error)
            loading.value = false
        }
    }

    const submitForm = async() => {
        loading.value = true
        useGlobalLoader().setLoader(true)
        try {
            await $fetch(urlBase + `vendors/${ store?.value.id }/update`, {
                method: 'POST',
                body: form.value
            })
            loading.value = false
            useGlobalLoader().setLoader(false)
        } catch(error) {
            console.log('error: ', error)
            loading.value = false
        }
    }
</script>