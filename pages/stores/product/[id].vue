<template>
    <span v-if="loading" id="loader" class="loading loading-dots loading-lg"></span>
    <div v-if="!loading" class="fixed flex flex-col space-y-4 bg-white w-full py-2">
        <div class="flex items-center space-x-2">
            <Icon name="bx:store" class="text-primary"/>
            <NuxtLink :to="`/stores/${ store?.id }`">
                <p class="text-sm font-semibold text-primary">{{ store?.name }} -</p>
            </NuxtLink>
            <NuxtLink v-if="useCartStore().table === null" :to="`/stores/station/${ store?.id }`">
                <p class="text-sm font-semibold text-blue-700 flex items-center space-x-1">
                    <Icon name="jam:alert"/>
                    <span>Click for table number</span>
                </p>
            </NuxtLink>
            <p v-else class="text-sm font-semibold text-gray-500">Table {{ useCartStore().table }}</p>
        </div>
        <div class="flex space-x-2 overflow-auto no-scrollbar">
            <a v-for="category in categories" :key="category" :href="`#${category}`">
                <Badge :name="category"></Badge>
            </a>
        </div>
    </div>
    <!-- <div v-if="!loading" class="flex items-center space-x-2 fixed bg-white w-2/3 p-4 border rounded-md">
        <Icon name="bx:store" class="text-primary"/>
        <NuxtLink :to="`/stores/${ store?.id }`">
            <p class="text-sm font-semibold text-primary">{{ store?.name }} -</p>
        </NuxtLink>
        <NuxtLink v-if="useCartStore().table === null" :to="`/stores/station/${ store?.id }`">
            <p class="text-sm font-semibold text-blue-700 flex items-center space-x-1">
                <Icon name="jam:alert"/>
                <span>Click for table number</span>
            </p>
        </NuxtLink>
        <p v-else class="text-sm font-semibold text-gray-500">Table {{ useCartStore().table }}</p>
    </div> -->
    <div v-if="!loading" class="space-y-4 text-left pt-20">
        <!-- <div v-if="useCartStore().table === null" class="flex flex-col bg-yellow-50 border border-yellow-500 rounded-md px-4 py-2">
            <p class="font-semibold text-sm text-yellow-700">Please scan a qr code for table number</p>
            <p class="text-sm text-gray-500">Seems like you do not have a table yet. Please scan the QR code for table</p>
        </div> -->

        <!-- product card -->
        <template v-for="(product, index) in products" :key="index">
            <h1 class="text-lg font-semibold">{{ index }}</h1>
            <div class="grid grid-cols-2 gap-4">
                <div :onclick="`card${ item.id }.showModal()`" class="border rounded-md p-4" v-for="item in product" :key="item.id">
                    <div class="h-20 text-center">
                        <Icon name="basil:image-outline" class="text-gray-200" height="70%" width="70%"/>
                    </div>
                    <div class="text-left space-y-2">
                        <h4 :id="index" class="font-semibold text-sm truncate">{{ item.name }}</h4>
                        <!-- <p class="text-sm text-gray-500">{{ item.description }}</p> -->
                        <div class="border rounded-full w-fit px-4 text-sm">
                            <span class="text-xs text-gray-500">from</span>
                            {{ useCartStore().price(item.price) }}
                        </div>
                    </div>

                    <!-- item modal -->
                    <dialog :id="`card${ item.id }`" class="modal">
                        <div class="modal-box space-y-4">
                            <div class="border rounded-lg text-center bg-yellow-50 border-yellow-500 px-4 py-1">
                                <span class="text-yellow-700 font-semibold">Recommended!</span>
                            </div>

                            <div class="border p-4 rounded-md text-center">
                                <Icon name="basil:image-outline" class="text-gray-200" height="30%" width="30%"/>
                            </div>

                            <div class="flex justify-between items-center">
                                <h4 class="font-semibold text-left">{{ item.name }}</h4>
                                <Badge :name="`${ useCartStore().price(item.price) }`"></Badge>
                            </div>
                            <p class="text-sm text-gray-500">{{ item.description }}</p>

                            <template v-if="item.variations.length !== 0">
                                <p class="text-sm text-gray-500 font-semibold">Choose options :-</p>
                                <div v-for="entry in item.variations" :key="entry.id" class="flex justify-between items-center border-b">
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
                                                <textarea class="textarea textarea-xs textarea-bordered h-24 ml-2 pl-1" v-model="notes[entry.id]" placeholder="Add some notes here ..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="addToCart(entry, 'variation')" class="bg-neutral rounded-md text-white h-8 w-8 flex items-center justify-center">
                                        <Icon name="typcn:plus" color="white"/>
                                    </button>
                                </div>
                            </template>

                            <template v-else>
                                <FormInput v-model="signature[item.id]" placeholder="Who is this for?" small class="mb-2" no-border></FormInput>
                                <div class="form-control">
                                    <textarea class="textarea textarea-xs textarea-bordered h-24" v-model="notes[item.id]" placeholder="Add some notes here ..."></textarea>
                                </div>
                                <button @click="addToCart(item, 'main')" class="bg-neutral text-white p-2 w-full rounded-md font-semibold">Add product</button>
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
            <button class="bg-blue-600 hover:bg-blue-700 flex items-center rounded-md justify-center w-full text-white py-3 px-4 drop-shadow-md font-bold">
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
            name: item.name,
            signature: signature.value[item.id],
            quantity: 1,
            price: item.price,
            // category: item.product_category.name,
            note: notes.value[item.id]
        }
        console.log('payload: ', payload)
        notes.value = {}
        signature.value = {}

        // reset notes
        notes.value = {}
        cartStore.setVendor(vendor_id)
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
            const result = await $fetch(`${ urlBase }vendors/${ vendor_id }/show`)
            store.value = result.data
        } catch (error) {
            console.error('error: ', error)
        }
    }

    async function fetchProducts() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ id }/products`)
            console.log('result: ', result)
            products.value = result.data
            loading.value = false
        } catch (error) {
            console.log('error: ', error)
        }
    }
</script>
