<template>
    <span v-if="loading" id="loader" class="loading loading-dots loading-lg"></span>
    <div v-else class="space-y-4 text-left">
        <!-- <div class="flex animate-pulse">
            <Icon class=" text-amber-800 h-8 w-8" name="tabler:coffee"/>
            <h1 class="font-semibold text-lg pt-1 ml-2 text-amber-800">Barista is preparing your order</h1>
        </div> -->

        <div class="border bg-yellow-50 border-yellow-500 text-yellow-700 rounded-md px-4 py-2">
            <span class="text-sm">
                Sign up or log in now for order history
            </span>
        </div>

        <h1 class="font-semibold text-lg">Order Summary</h1>

        <div class="px-1 space-y-4">
            <div class="flex justify-between">
                <iconed-label label-class="font-semibold" icon-class="text-gray-500" icon="iconoir:shop" :label="`${ store?.name }`"></iconed-label>
                <span class="text-sm font-semibold text-gray-500">{{ orderNumber() }}</span>
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

        <div class="bg-gray-100 rounded-md p-4 space-y-2">
            <div v-for="item in cart" :key="item" class="flex items-center space-x-2">
                <span class="bg-white h-6 w-6 rounded-md flex items-center justify-center font-semibold text-sm">
                    1
                </span>

                <div class="grow flex flex-row justify-between">
                    <div class="flex flex-col text-left justify-between py-2">
                        <h4 class="text-sm font-semibold">{{ item.name }}</h4>
                        <span class="text-sm text-gray-500">{{ item.note }}</span>
                        <!-- <span class="text-sm text-gray-500">{{ useCartStore().price(item.price) }}</span> -->
                    </div>
                </div>
                <span class="bg-white py-1 px-2 rounded-md flex items-center justify-center font-semibold text-sm">
                    {{ useCartStore().price(item.price) }}
                </span>
            </div>
        </div>

        <div class="bg-gray-100 rounded-md p-4 flex justify-between items-center">
            <span class="text-sm font-semibold">Total</span>
            <span class="bg-white py-1 px-2 rounded-md flex items-center justify-center font-semibold text-sm">
                {{ useCartStore().totalPrice() }}
            </span>
        </div>

        <hr>
        <h1 class="font-semibold text-md">How do you want to pay?</h1>
        <div class="flex space-x-4">
            <label :class="`${ paymentMethod === 'counter' ? 'bg-gray-700 text-white' : 'bg-gray-100' } rounded-md p-4 flex-1 font-semibold text-sm text-center`">
                Pay at the counter
                <input type="radio" name="paymentMethod" v-model="paymentMethod" value="counter" class="radio checked:bg-red-500 hidden" checked />
            </label>
            <label onclick="qr.showModal()" :class="`${ paymentMethod === 'duitnow' ? 'bg-gray-700 text-white' : 'bg-gray-100' } rounded-md p-4 flex-1 font-semibold text-sm text-center`">
                DuitNow QR
                <input type="radio" name="paymentMethod" v-model="paymentMethod" value="duitnow" class="radio checked:bg-red-500 hidden" checked />
            </label>
        </div>
        <div v-if="paymentMethod === 'counter'" class="text-sm text-gray-500">*Please pay at the counter during order pickup</div>

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

        <div class="px-4 fixed bottom-5 left-0 w-full">
            <button class="bg-green-600 flex items-center rounded-md justify-center w-full text-white p-4 drop-shadow-md font-semibold space-x-2">
                <Icon name="ic:baseline-whatsapp" color="white"/>
                <a
                    target="__blank"
                    :href="`https://wa.me/60124441998?text=${ encodedOrder }`"
                    @click="checkout">
                    WhatsApp order
                </a>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'
    const store = ref()
    const loading = ref(true)
    const route = useRoute()
    const urlBase = inject('urlBase')
    const vendor_id = route.params.id
    const table = route.query.table ?? null
    const { $todayDate } = useNuxtApp()

    const paymentMethod = ref('counter')
    watch(paymentMethod, (data) => {
        useCartStore().setPaymentMethod(data)
    })

    onMounted(() => {
        fetchVendor()
    })

    let cart = ref([])
    cart = computed(() => {
        return useCartStore().cart ? useCartStore().cart : []
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

    function orderNumber() {
        let minm = 100000
        let maxm = 999999
        let number = Math.floor(Math.random() * (maxm - minm + 1)) + minm
        return '# GR' + number + '-' + vendor_id
    }
</script>