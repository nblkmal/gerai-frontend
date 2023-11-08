<template>
    <span v-if="loading" id="loader" class="loading loading-dots loading-lg"></span>
    <div v-else class="space-y-4 text-left">
        <!-- <div class="flex animate-pulse">
            <Icon class=" text-amber-800 h-8 w-8" name="tabler:coffee"/>
            <h1 class="font-semibold text-lg pt-1 ml-2 text-amber-800">Barista is preparing your order</h1>
        </div> -->

        <div v-if="user === null" class="border bg-yellow-50 border-yellow-500 text-yellow-700 rounded-lg px-4 py-2">
            <span class="text-sm">
                Sign up or log in now for order history
            </span>
        </div>

        <h1 class="font-semibold text-lg">Order Summary</h1>
        <hr>

        <template v-if="useCartStore().cart.length === 0">
            <div class="flex flex-col justify-center items-center space-y-4 py-8 bg-gray-100 rounded-lg">
                <Icon name="solar:cart-large-2-bold-duotone" class="h-6 w-6 rouned-full text-gray-600 group-hover:text-primary"/>
                <span class="text-gray-500 font-semibold">Your cart is empty</span>
            </div>
        </template>
        <template v-else>
            <div class="px-1 space-y-4">
                <div class="flex justify-between">
                    <iconed-label label-class="font-semibold" icon-class="text-gray-500" icon="iconoir:shop" :label="`${ store?.name }`"></iconed-label>
                    <span class="text-sm font-semibold text-gray-500"># {{ orderNumber }}</span>
                </div>

                <iconed-label
                    label-class="font-semibold"
                    icon-class="text-gray-500"
                    icon="material-symbols:table-restaurant-rounded"
                    :label="table ? `Table ${ table }` : 'No table'"></iconed-label>

                <iconed-label
                    label-class="font-semibold"
                    icon-class="text-gray-500"
                    icon="solar:calendar-date-line-duotone"
                    :label="`${ $todayDate }`"></iconed-label>
            </div>

            <div class="bg-gray-100 rounded-lg p-4 space-y-2">
                <div v-for="item in cart" :key="item" class="flex items-center space-x-2">
                    <span class="bg-white h-6 w-6 rounded-lg flex items-center justify-center font-semibold text-sm">
                        1
                    </span>

                    <div class="grow flex flex-row justify-between">
                        <div class="flex flex-col text-left justify-between py-2">
                            <h4 class="text-sm font-semibold">{{ item.name }}</h4>
                            <span class="text-sm text-gray-500">{{ item.note }}</span>
                            <!-- <span class="text-sm text-gray-500">{{ useCartStore().price(item.price) }}</span> -->
                        </div>
                    </div>
                    <span class="bg-white py-1 px-2 rounded-lg flex items-center justify-center font-semibold text-sm">
                        {{ useCartStore().price(item.price) }}
                    </span>
                </div>
            </div>

            <div class="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
                <span class="text-sm font-semibold">Total</span>
                <span class="bg-white py-1 px-2 rounded-lg flex items-center justify-center font-semibold text-sm">
                    RM{{ useCartStore().totalPrice() }}
                </span>
            </div>

        </template>

        <!-- <hr>
        <h2 class="text-md font-semibold">Past Order</h2>
        <div v-if="orderHistory.length !== 0" class="join join-vertical w-full">
            <div v-for="order in orderHistory" :key="order.order_number" class="collapse collapse-arrow join-item border border-base-300 py-0">
                <input type="checkbox" name="my-accordion-4" /> 
                <div class="collapse-title font-semibold text-sm flex items-center">
                    # {{ order.order_number }}
                </div>
                <div class="collapse-content">
                    <span v-for="item in order.cart" :key="item.name">
                        <p class="text-sm font-semibold">
                            <span class="mr-4">1x</span> {{ item.name }}
                        </p>
                        <small class="text-gray-500 ml-8">{{ item.note }}</small>
                    </span>
                </div>
            </div>
        </div> -->

        <!-- duitnow qr -->
        <dialog id="qr" class="modal">
            <div class="modal-box">
                <span class="text-sm text-gray-500">*Please share the receipt in WhatsApp</span>
                <button class="btn btn-block">Save image</button>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

        <div class="px-4 fixed bottom-5 left-0 w-full z-20">
            <button class="bg-green-600 flex items-center rounded-lg justify-center w-full text-white p-4 drop-shadow-md font-semibold space-x-2">
                <span v-if="!orderSubmitted" class="flex items-center justify-center space-x-2">
                    <Icon name="ic:baseline-whatsapp" color="white"/>
                    <a
                        target="__blank"
                        @click="checkout">
                        WhatsApp order
                    </a>
                </span>
                <span v-else class="flex items-center justify-center space-x-2 ">
                    <Icon name="teenyicons:tick-circle-outline" color="white"/>
                    <span>Order Submitted</span>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'
    import { useUserStore } from '~/store/user'

    const store = ref()
    const loading = ref(true)
    const route = useRoute()
    const urlBase = inject('urlBase')
    const vendor_id = route.params.id
    const { $todayDate } = useNuxtApp()

    const paymentMethod = ref('counter')
    watch(paymentMethod, (data) => {
        useCartStore().setPaymentMethod(data)
    })

    onMounted(() => {
        useCartStore().checkCart()
        useCartStore().setOrderNumber()
        fetchVendor()
    })

    let cart = ref([])
    cart = computed(() => {
        return useCartStore().cart ? useCartStore().cart : []
    })

    let table = ref(null)
    table = computed(() => {
        return useCartStore().table ? useCartStore().table : null
    })

    let orderNumber = ref(null)
    orderNumber = computed(() => {
        return useCartStore().order_number ? useCartStore().order_number : null
    })

    let orderHistory = ref([])
    orderHistory = computed(() => {
        return useCartStore().orderHistory
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

    const user = computed(() => {
        return useUserStore().user
    })

    const encodedOrder = computed(() => {
        return useCartStore().encodedOrder(useUserStore().user)
    })

    const orderSubmitted = ref(false)
    async function checkout() {
        try {
            let payload = useCartStore().getPayload()

            payload['user_id'] = useUserStore().user ? useUserStore().user.id : null

            console.log('payload: ', payload)
            await $fetch(`${ urlBase }vendors/${ vendor_id }/order`, {
                method: 'POST',
                body: payload
            }).then((res) => {
                console.log('res: ', res)
                if (res.status === 'success') {
                    // set order reference id
                    useCartStore().setOrderRef(res.data.order_uuid)
                    // redirect to whatsapp
                    window.location.href = `https://wa.me/6${ store?.value.phone }?text=${ encodedOrder.value }`
                }
            }).catch(error => {
                console.error(error)
            })

            // set previous order
            useCartStore().setPastOrder(payload)

            // reset new order number
            useCartStore().setOrderNumber()

            orderSubmitted.value = true
            // reset cart
            useCartStore().clearCart()

        } catch (error) {
            console.error(error)
        }
    }
</script>