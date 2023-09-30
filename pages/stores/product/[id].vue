<template>
    <span v-if="loading" id="loader" class="loading loading-dots loading-lg"></span>
    <div v-else class="space-y-4 text-left">
        <div class="flex items-center space-x-4">
            <!-- <div class="rounded-full border h-16 w-16 flex items-center justify-center">
                <Icon name="basil:image-outline" color="black" height="40%" width="40%"/>
            </div> -->
            
            <div class="flex flex-col text-left space-y-1">
                <h4 class="font-bold">{{ store?.name }}</h4>
                <p class="text-sm text-left">Nilai, Negeri Sembilan</p>
                <div class="flex space-x-1">
                    <Icon name="basil:star-solid" color="orange" />
                    <Icon name="basil:star-solid" color="orange" />
                    <Icon name="basil:star-solid" color="orange" />
                </div>
            </div>
        </div>
        
        <!-- <div class="tabs flex justify-items-stretch">
            <a v-for="(product, index) in products" :key="index" class="tab tab-bordered tab-active flex-1 font-semibold">{{ index }}</a> 
        </div> -->

        <!-- customer details -->
        <!-- <div class="collapse collapse-arrow border text-left rounded-md">
            <input type="checkbox" name="my-accordion-2" /> 
            <div class="collapse-title font-medium">
                Customer Details
            </div>
            <div class="collapse-content"> 
                <FormInput label="Name" v-model="form.name" :value="user?.name"></FormInput>
                <FormGroup placeholder="12 - 345 6789" left-append="+60" label="Phone Number"></FormGroup>
            </div>
        </div> -->

        <!-- <div class="flex overflow-auto space-x-2 no-scrollbar">
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
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
                        <h4 class="font-semibold text-sm truncate">{{ item.name }}</h4>
                        <!-- <p class="text-sm text-gray-500">{{ item.description }}</p> -->
                        <div class="border rounded-full w-fit px-4 text-sm">
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

                            <div class="form-control">
                                <textarea class="textarea textarea-bordered h-24" v-model="notes[item.id]" placeholder="Add some notes here ..."></textarea>
                            </div>

                            <form method="dialog" class="flex space-x-2">
                                <!-- <button @click="removeFromCart(item)" class="btn">-</button> -->
                                <button @click="addToCart(item)" class="btn flex-1">Add to cart</button>
                            </form>
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

    const addToCart = (item) => {
        let payload = {
            name: item.name,
            quantity: 1,
            price: item.price,
            category: item.product_category.name,
            note: notes.value[item.id]
        }

        // reset notes
        notes.value = {}
        cartStore.setVendor(vendor_id)
        cartStore.add(payload)
    }


    const user = computed(() => {
        return useUserStore().user
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
            products.value = result.data
            loading.value = false
        } catch (error) {
            console.log('error: ', error)
        }
    }
</script>
