<template>
    <div v-if="!loading" class="fixed flex flex-col space-y-4 backdrop-blur-sm bg-white/30 w-full py-2">
        <div v-if="!visitPublic" class="flex items-center space-x-2">
            <Icon name="bx:store" class="text-primary"/>
            <NuxtLink :to="`/stores/${ store?.slug }`">
                <p class="text-sm font-semibold text-primary">{{ store?.name }}</p>
            </NuxtLink>
            <NuxtLink v-if="useCartStore().table === null" :to="`/stores/station/${ store?.slug }`">
                <p class="text-sm font-semibold text-blue-700 flex items-center space-x-1">- 
                    <Icon name="jam:alert"/>
                    <span>Click for table number</span>
                </p>
            </NuxtLink>
            <p v-else class="text-sm font-semibold text-gray-500">Table {{ useCartStore().table }}</p>
        </div>
        <details ref="categoryButtonRef" class="dropdown dropdown-bottom flex">
            <summary tabindex="0" class="w-48 border rounded-full flex items-center justify-between space-x-12 px-4 py-1 bg-neutral text-white">
                <span class="text-sm">{{ selectedCategory === '' ? categories[0] : selectedCategory }}</span>
                <Icon name="ep:arrow-down-bold" class="w-3 h-3"/>
            </summary>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li v-for="(category, index) in categories" :key="category" @click="scrollTo(index)"><a :href="`#${category}`">{{ category }}</a></li>
            </ul>
        </details>
        
        <!-- <div class="flex space-x-2 overflow-auto no-scrollbar">
            <a v-for="category in categories" :key="category" :href="`#${category}`">
                <Badge :name="category"></Badge>
            </a>
        </div> -->
    </div>
    <div v-if="!loading" :class="`space-y-4 text-left ${ visitPublic ? 'pt-12' : 'pt-20'}`">
        <!-- <div v-if="useCartStore().table === null" class="flex flex-col bg-yellow-50 border border-yellow-500 rounded-lg px-4 py-2">
            <p class="font-semibold text-sm text-yellow-700">Please scan a qr code for table number</p>
            <p class="text-sm text-gray-500">Seems like you do not have a table yet. Please scan the QR code for table</p>
        </div> -->

        <!-- product card -->
        <template v-for="(product, index) in products" :key="index">
            <h1 ref="categoryRefs" class="text-lg font-semibold">{{ index }}</h1>
            <div class="grid grid-cols-2 gap-4">
                <div :onclick="`card${ item.id }.showModal()`" class="border rounded-lg" v-for="item in product" :key="item.id">
                    <div class="text-center mb-1">
                        <img v-if="item.media.length !== 0" :src="item.media[0].original_url" alt="" class="object-cover h-20 w-full border-b rounded-t-lg">
                        <Icon v-else name="basil:image-outline" class="text-gray-200 h-20" height="70%" width="70%"/>
                    </div>
                    <div class="text-left space-y-2 px-4 pb-4">
                        <h4 class="font-semibold text-sm truncate">{{ item.name }}</h4>
                        <div class="border rounded-full w-fit px-4 text-sm">
                            <span class="text-xs text-gray-500">from</span>
                            {{ useCartStore().price(item.price) }}
                        </div>
                    </div>

                    <!-- item modal -->
                    <dialog :id="`card${ item.id }`" class="modal">
                        <div class="modal-box space-y-4">
                            <div class="border rounded-lg text-center bg-yellow-50 border-yellow-500 px-4 py-1">
                                <span v-if="!visitPublic" class="text-yellow-700 font-semibold">Order feature is coming soon!</span>
                                <span v-else class="text-yellow-700 font-semibold">Order available on premise</span>
                            </div>

                            <div class="border p-4 rounded-lg text-center">
                                <Icon name="basil:image-outline" class="text-gray-200" height="30%" width="30%"/>
                            </div>

                            <div class="flex justify-between items-center">
                                <h4 class="font-semibold text-left">{{ item.name }}</h4>
                                <Badge :name="`${ useCartStore().price(item.price) }`"></Badge>
                            </div>
                            <p class="text-sm text-gray-500">{{ item.description }}</p>

                            <template v-if="item.variations.length !== 0">
                                <p class="text-sm text-neutral font-semibold">See options :-</p>
                                <small v-if="!visitPublic" class="text-gray-500">Click item for more options</small>
                                <div v-for="(entry, index) in item.variations" :key="entry.id" :class="`flex justify-between ${ index === item.variations.length - 1 ? '' : 'border-b' } items-stretch`">
                                    <div class="collapse">
                                        <input type="checkbox" /> 
                                        <div class="collapse-title p-0">
                                            <p class="text-sm text-gray-500 collapse-title mt-1 font-semibold pl-0">
                                                {{ entry.name }} (RM {{ entry.price }})
                                            </p>
                                        </div>
                                        <div class="collapse-content pl-0"> 
                                            <FormInput v-model="signature[entry.id]" placeholder="Who is this for?" small class="ml-2 mb-2" no-border></FormInput>
                                            <div class="form-control">
                                                <textarea class="textarea textarea-xs h-24 ml-2 pl-1" v-model="notes[entry.id]" placeholder="Add some notes here ..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!visitPublic" class="pt-4 self-start">
                                        <button @click="addToCart(entry, 'variation')" class="bg-neutral rounded-lg text-white h-8 w-8 flex items-center justify-center">
                                            <Icon name="typcn:plus" color="white"/>
                                        </button>
                                    </div>
                                </div>
                            </template>

                            <template v-else>
                                <template v-if="!visitPublic">
                                    <FormInput v-model="signature[item.id]" placeholder="Who is this for?" small class="mb-2" no-border></FormInput>
                                    <div class="form-control">
                                        <textarea class="textarea textarea-xs h-24" v-model="notes[item.id]" placeholder="Add some notes here ..."></textarea>
                                    </div>
                                    <button @click="addToCart(item, 'main')" class="bg-neutral text-white p-2 w-full rounded-lg font-semibold">Add product</button>
                                </template>
                            </template>

                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </template>

        <!-- <div class="px-4 fixed bottom-5 left-0 w-full">
            <button class="bg-blue-600 hover:bg-blue-700 flex items-center rounded-lg justify-center w-full text-white py-3 px-4 drop-shadow-md font-bold">
                Checkout
                <Icon name="basil:caret-right-outline" color="white" height="10%" width="10%"/>
            </button>
        </div> -->
    </div>
</template>

<script setup lang="js">
    import { useUserStore } from '~/store/user'
    import { useCartStore } from "~/store/cart"

    const cartStore = useCartStore();
    const signature = ref({})
    const notes = ref({})
    const emit = defineEmits(['loading'])

    const props = defineProps({
        visitPublic: Boolean
    })

    const categoryRefs = ref([])
    const categoryButtonRef = ref('')

    const alreadyInCart = (item) => {
        const x = cartStore.cart?.find(el => el.id === item.id)
        if (x?.id) {
            return true
        } else {
            return false
        }
    }

    const removeFromCart = (item) => {
        if(alreadyInCart(item)) {
            cartStore.remove(item)
        }
    }

    const route = useRoute()
    const id = route.params.id
    const vendor_id = id

    const addToCart = (item, type) => {
        let payload = {
            type: type,
            product_id: item.id,
            name: item.name,
            signature: signature.value[item.id] ?? '',
            quantity: 1,
            price: item.price,
            // category: item.product_category.name,
            note: notes.value[item.id] ?? ''
        }
        notes.value = {}
        signature.value = {}

        // reset notes
        notes.value = {}
        cartStore.setVendor(vendor_id)
        console.log('payload: ', payload)
        cartStore.add(payload)
    }


    const user = computed(() => {
        return useUserStore().user
    })

    const categories = computed(() => {
        return Object.keys(products.value) ?? []
    })

    const store = ref()
    const loading = ref(true)
    const form = ref({
        name: ''
    })

    onMounted(() => {
        fetchVendor()
        fetchProducts()
    })

    const urlBase = inject('urlBase')
    const products = ref({})

    async function fetchVendor() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ vendor_id ?? getSubdomain() }/show`)
            store.value = result.data
        } catch (error) {
            console.error('error: ', error)
        }
    }

    async function fetchProducts() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ vendor_id ?? getSubdomain() }/products?groupby=categories`)
            products.value = result.data
            loading.value = false
            emit('loading', false)
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const selectedCategory = ref('')
    
    function scrollTo(item) {
        categoryButtonRef.value.open = false
        selectedCategory.value = categories.value[item]
        categoryRefs.value[item]?.scrollIntoView({behavior: "smooth", block: "center"})
    }

    // const { data: currentStore } = await useAsyncData(id, () => {
    //     return fetchVendor()
    // })

    // useSeoMeta({
    //     title: () => currentStore.value?.name,
    //     ogTitle: () => currentStore.value?.name,
    //     description: () => currentStore.value?.description,
    //     ogDescription: () => currentStore.value?.description,
    //     ogImage: 'https://example.com/image.png',
    //     twitterCard: 'summary_large_image',
    // })
</script>