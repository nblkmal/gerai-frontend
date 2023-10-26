<template>
    <!-- <div class="space-y-4 flex flex-col items-center justify-center" style="height: 30rem;"> -->
        
        <h1 class="text-sm text-gray-500 pt-20">You are visitting gerai</h1>
        <div class="flex items-center justify-center space-x-4">
            <div class="bg-gray-100 h-8 w-8 rounded-full"></div>
            <div v-if="loading" class="animate-pulse bg-gray-100 h-6 w-32 rounded-full"></div>
            <h1 v-else class="font-semibold">{{ store?.name }}</h1>
        </div>
        <!-- <div class="flex">
            <Badge
                icon="mingcute:tag-fill"
                class="h-fit"
                :name="table ? 'Table ' + table : 'No table ? Ask for vendor\'s help'"
                :type="table ? '' : 'warning'"
                ></Badge>
        </div> -->
        <p class="text-sm text-gray-500">Start your experience by choosing any table</p>
        <div class="flex overflow-auto space-x-4 bg-gray-100 p-4 rounded-md">
            <label v-for="number in 12" :key="number" :class="`flex items-center justify-center border rounded-full h-8 w-8 p-6 ${ table === number ? 'bg-neutral text-white' : 'bg-white' }`">
                {{ number }}
                <input v-model="table" :value="number" type="radio" class="hidden" />
            </label>
        </div>

        <div class="px-4 fixed bottom-5 left-0 w-full z-20">
            <NuxtLink :to="`/stores/product/${ store?.id }`">
                <button @click="setTable" class="bg-neutral flex items-center rounded-md justify-center w-full text-white p-4 drop-shadow-md font-semibold space-x-2">
                    <span>Start Ordering</span>
                    <!-- <Icon name="icon-park-outline:right-c" color="white"/> -->
                </button>
            </NuxtLink>
        </div>

        <!-- <div class="flex overflow-auto space-x-2 no-scrollbar">
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
        </div> -->

    <!-- </div> -->
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    const route = useRoute()
    const vendor_id = route.params.id
    const urlBase = inject('urlBase')
    const loading = ref(true)
    const store = ref()
    const table = ref('')

    onMounted(() => {
        fetchVendor()
    })

    async function fetchVendor() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ vendor_id }/show`)
            store.value = result.data
            loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    function setTable() {
        useCartStore().setTable(table)
    }
</script>