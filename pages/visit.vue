<template>
    <!-- <Head>
        <Title>{{ store?.name }}</Title>
        <Meta name="description" :content="store?.description ?? '' + 'Powered by gerai'" />
    </Head> -->
    <img class="w-full h-28 mt-14" src="/shopping.svg" alt="">
    <h1 class="text-sm text-gray-500">You are visitting</h1>
    <div class="flex items-center justify-center space-x-4">
        <!-- <div class="bg-gray-100 h-8 w-8 rounded-full"></div> -->
        <div v-if="loading" class="animate-pulse bg-gray-100 h-6 w-32 rounded-full"></div>
        <h1 v-else class="font-semibold">{{ store?.name }}</h1>
    </div>

    <p class="text-sm text-gray-500">Start your experience by choosing any table</p>
    <div class="flex overflow-auto space-x-4 bg-gray-100 p-4 rounded-md">
        <label v-for="item in tableList" :key="item.id" :class="`flex items-center justify-center border border-dotted rounded-full h-8 w-8 p-6 ${ table === item.number ? 'bg-neutral text-white' : 'bg-white' }`">
            {{ item.number }}
            <input v-model="table" :value="item.number" type="radio" class="hidden" />
        </label>
    </div>

    <p class="text-sm text-gray-500 pt-2 flex items-center justify-center space-x-1">
        <span>Let us serve you better</span>
        <Icon name="ph:question-duotone" class=" h-4 w-4"/>
    </p>
    <FormInput v-model="email" label="Email" placeholder="Who is this for?"></FormInput>
    <FormGroup placeholder="012345678" v-model="phone" type="integer" left-append="+60" label="Phone Number"></FormGroup>

    <div class="px-4 fixed bottom-5 left-0 w-full z-20">
        <NuxtLink :to="`/stores/product/${ store?.slug }`" class="w-full space-x-2">
            <button @click="setTable" :disabled="table === ''" :class="`${ table === '' ? 'opacity-80' : '' } bg-neutral flex items-center rounded-md justify-center w-full text-white p-4 drop-shadow-md font-semibold`">
                <span>Start Ordering</span>
            </button>
        </NuxtLink>
    </div>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    const route = useRoute()
    const vendor_id = route.params.id
    const urlBase = inject('urlBase')
    const loading = ref(true)
    const store = ref()
    const tableList = ref()
    const table = ref('')

    const name = ref('')
    const email = ref('')
    const phone = ref('')

    const subdomain = getSubdomain()

    // useHead({
    //     titleTemplate: (store) => {
    //         return store
    //         ? `${store?.name} - Site Title`
    //         : 'Site Title'
    //     },
    //     meta: [
    //         { name: 'description', content: store ? store.description : '' + 'Powered by gerai' }
    //     ]
    // })
    const { data: current, pending } = await useAsyncData('currentStore',
        () => {
            return $fetch(`${ urlBase }vendors/${ subdomain }/show`).then(res => {
                return res.data
            })
        }
    )
    // if (current.value === null) {
    //     console.log('current: ', current)
    //     refreshNuxtData('currentStore')
    // } else {
    //     console.log('dah tak null')
    //     console.log('current: ', current)
    // }

    console.log('current: ', current)
    
    useSeoMeta({
        title: () => current.value?.name,
        ogTitle: () => 'current.value?.name',
        description: () => current.value?.description,
        ogDescription: () => 'current.value?.description',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    })

    onMounted(() => {
        fetchTables()
        fetchVendor()
    })

    async function fetchVendor() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ subdomain }/show`)
            store.value = result.data
            loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    async function fetchTables() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ subdomain }/station`)
            tableList.value = result.data
            loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    function setTable() {
        let detail = {
            email: email,
            phone: phone
        }
        useCartStore().setCustomer(detail)
        useCartStore().setTable(table)
    }
</script>