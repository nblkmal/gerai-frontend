<template>
    <h1 class="text-lg font-semibold pt-8">Find your table here</h1>

    <p class="text-sm text-gray-500 px-4 pb-8">Discover the joy of shopping with a side of comfort and ambiance. Select your ideal table and make your visit truly special.</p>
    <div class="flex overflow-auto space-x-4 bg-gray-100 p-4 rounded-lg">
        <label v-for="item in tableList" :key="item.id" :class="`flex items-center justify-center border border-dotted rounded-full h-8 w-8 p-6 ${ table === item.number ? 'bg-neutral text-white' : 'bg-white' }`">
            {{ item.number }}
            <input v-model="table" :value="item.number" type="radio" class="hidden" />
        </label>
    </div>

    <p v-if="table" class="text-md font-semibold pt-8">{{ toast }}</p>
    
    <div class="px-4 fixed bottom-5 left-0 w-full z-20">
        <button @click="setTable" :disabled="table === ''" :class="`${ table === '' ? 'opacity-80' : '' } bg-neutral flex items-center rounded-lg justify-center w-full text-white p-4 drop-shadow-md font-semibold`">
            <NuxtLink :to="`/stores/product/${ useRoute().params.id }`" class="w-full space-x-2">
                <span>Continue Ordering</span>
                <Icon name="icon-park-outline:right-c" color="white"/>
            </NuxtLink>
        </button>
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

    onMounted(() => {
        fetchTables()
        // fetchVendor()
    })

    async function fetchTables() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ vendor_id }/station/`)
            console.log('result: ', result)
            tableList.value = result.data
            loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    function setTable() {
        console.log('hit: ')
        useCartStore().setTable(table)
    }
</script>