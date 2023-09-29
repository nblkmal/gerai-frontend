<template>
    <div v-if="cart.length === 0" class="flex flex-col justify-center items-center space-y-4 py-4">
        <Icon name="solar:cart-large-2-bold-duotone" class="h-6 w-6 rouned-full text-gray-600 group-hover:text-primary"/>
        <span class="text-gray-500 font-semibold">Your cart is empty</span>
    </div>
    <template v-else>
        <h1 class="font-semibold text-xl">Items to checkout ..</h1>
        <div class="max-h-80 overflow-y-auto overflow-x-hidden -mr-6 pr-12">
            <ul class="menu rounded-box -mx-6">
                <li v-for="(item, index) in cart" :key="item.name + item.note">
                    <a class="flex justify-between">
                        <Icon @click="removeOne(index)" class="mr-4 text-red-500" name="bi:dash-circle-dotted"/>
                        <div class="flex-1 flex flex-col">
                            <span class="font-semibold">{{ item.name }}</span>
                            <span class="text-gray-500">{{ item.note }}</span>
                        </div>
                        <span class="bg-gray-50 h-8 w-8 rounded-md flex items-center justify-center font-semibold">1</span>
                    </a>
                </li>
            </ul>

        </div>
        <div class="flex justify-between items-center px-6 pt-4 border-t -mx-5">
            <!-- <div class="tooltip" data-tip="We will submit your order through WhatsApp application.">
                <Icon name="ph:info-fill" class="text-gray-500"/>
            </div> -->
            <div class="flex-1 flex flex-col">
                <span class="text-sm">Subtotal ({{ cart.length }} item{{ cart.length > 1 ? 's' : ''}})</span>
                <span class="text-primary font-semibold">{{ cartStore.totalPrice() }}</span>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- <NuxtLink :to="`/stores/product/checkout/${ vendor_id }`"> -->
                    <button @click="navigateCheckout" class="btn btn-primary capitalize text-white py-4 flex items-center justify-center align-baseline">
                        Checkout
                    </button>
                    <!-- </NuxtLink> -->
                    <!-- <a
                        target="__blank"
                        :href="`https://wa.me/60124441998?text=${ encodedOrder }`"
                        @click="checkout"
                        class="btn btn-primary capitalize text-white py-4 flex items-center justify-center align-baseline">
                        Checkout
                    </a> -->
                </form>
            </div>
        </div>
    </template>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    const cartStore = useCartStore()
    let cart = ref([])
    cart = computed(() => {
        return useCartStore().cart ? useCartStore().cart : []
    })

    let vendor_id = ref('')
    vendor_id = computed(() => {
        return useCartStore().vendor_id ? useCartStore().vendor_id : ''
    })

    async function navigateCheckout() {
        await navigateTo(`/stores/product/checkout/${ vendor_id.value }`)
    }

    // const vendor_id = ref(useCartStore().vendor_id)
    // const vendor_id = ref('useCartStore().vendor_id')

    const removeOne = (index) => {
        cartStore.removeOne(index)
    }

    const encodedOrder = computed(() => {
        return cartStore.encodedOrder()
    })

    function checkout() {
        console.log('clicked')
        // send to mastanah api
    }
</script>