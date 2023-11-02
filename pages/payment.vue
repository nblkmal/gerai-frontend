<template>
    <div class="flex justify-between bg-gray-100 p-4 rounded-md items-center">
        <div class="flex flex-col">
            <h1 class="text-left font-semibold text-xs text-gray-500">#{{ order?.order_number }}</h1>
            <p class="text-md text-left font-semibold text-neutral">RM{{ order?.amount }}</p>
        </div>
        <p onclick="orderSummary.showModal()" class="font-semibold text-sm">View Order</p>
        <dialog id="orderSummary" class="modal">
            <div class="modal-box">
                <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 class="font-bold text-lg mb-2">Order Summary</h3>
                <div v-for="item in order?.meta?.cart" :key="item.product_id">
                    <a class="flex justify-between py-2">
                        <div class="flex-1 flex flex-col text-left">
                            <span class="font-semibold">{{ item.name }}</span>
                            <span v-if="item.signature" class="text-gray-700">for {{ item.signature }}</span>
                            <span v-if="item.note" class="text-gray-500">{{ item.note }}</span>
                        </div>
                        <span class="bg-gray-50 h-8 w-8 rounded-md flex items-center justify-center font-semibold">1</span>
                    </a>
                </div>
                <div class="bg-gray-100 rounded-md py-2 mt-2">
                    <span class="font-semibold">Total : RM{{ order?.amount }}</span>
                </div>
            </div>
        </dialog>
    </div>
    <h1 class="font-semibold text-lg text-left">How do you want to pay?</h1>
    <div class="flex space-x-4 pb-8 overflow-x-auto">
        <label :class="`${ paymentMethod === 'counter' ? 'bg-gray-700 text-white' : 'bg-gray-100' } rounded-md p-4 text-center flex flex-col items-center justify-center flex-1`">
            <Icon name="bi:cash" class="h-8 w-8 pb-2"/>
            <p class="text-xs">Counter</p>
            <input type="radio" name="paymentMethod" v-model="paymentMethod" value="counter" class="radio checked:bg-red-500 hidden" checked />
        </label>
        <label v-for="method in paymentMethods" :key="method.id" :class="`${ paymentMethod === method.id ? 'bg-gray-700 text-white' : 'bg-gray-100' } rounded-md p-4 text-center flex flex-col items-center justify-center flex-1`">
            <Icon :name="`${ method.type === 'qr-code' ? 'uil:qrcode-scan' : 'mingcute:transfer-fill' }`" class="h-8 w-8 pb-2"/>
            <p class="text-xs">{{ method.label }}</p>
            <input type="radio" name="paymentMethod" v-model="paymentMethod" :value="method.id" class="radio checked:bg-red-500 hidden" />
        </label>
    </div>

        <template v-if="type === 'counter'">
            <div class="flex flex-col w-full">
                <img class="h-40 w-auto mb-8" src="/counter.svg">
                <h2 class="font-semibold text-md">Please visit the counter</h2>
            </div>
        </template>

        <template v-if="type === 'online-banking'">
            <div class="flex flex-col">
                <h2 class="font-semibold text-md text-left">Please complete the payment</h2>
                <ul class="steps steps-vertical text-sm">
                    <li class="step">Copy the bank details below</li>
                    <li class="step">Make payment</li>
                    <li class="step" data-content="★">Share the receipt in WhatsApp</li>
                    <li class="step step-success font-semibold" data-content="✓">Order confirmed!</li>
                </ul>
            </div>
            <div class="flex flex-col w-full">
                <div class="flex items-center justify-center bg-gray-100 w-full rounded-t-md py-2 space-x-2">
                    <p id="sample" class="text-lg font-bold">{{ selectedMethod.bank_account }}</p>
                    <Icon @click="CopyToClipboard('sample')" name="ion:copy" class="text-gray-400"/>
                </div>
                <div class="border border-gray-100 rounded-b-md py-2">
                    <p class="text-md font-semibold">{{ selectedMethod.account_holder_name }}</p>
                    <p class="text-sm">{{ selectedMethod.bank }}</p>
                </div>
            </div>
        </template>

        <template v-if="type === 'duitnow-qr'">
            <div class="flex flex-col w-full">
                <h2 class="font-semibold text-md text-left">Please follow the guide</h2>
                <ul class="steps steps-vertical text-sm">
                    <li class="step">
                        Scan or download the QR Code below
                    </li>
                    <li class="step">Make payment</li>
                    <li class="step" data-content="★">Share the receipt in WhatsApp</li>
                    <li class="step step-success font-semibold" data-content="✓">Order confirmed!</li>
                </ul>
                <div v-if="selectedMethod.media.length !== 0" class="border w-full p-8 rounded-md">
                    <img :src="selectedMethod.media[0].original_url" alt="">
                    <a :href="selectedMethod.media[0].original_url" download class="bg-neutral text-white w-full p-2 rounded-md btn">Download</a>
                </div>

            </div>
        </template>
    <!-- <div v-if="paymentMethod === 'counter'" class="text-sm text-gray-500">*Please pay at the counter during order pickup</div> -->
</template>

<script setup>
    const paymentMethod = ref('counter')
    const selectedMethod = ref({})
    const paymentMethods = ref({})
    const urlBase = inject('urlBase')
    const loading = ref(true)
    const { $toast } = useNuxtApp()

    const route = useRoute()
    const order_uuid = 'ref' in route.query ? route.query.ref : null
    const order = ref({})

    const subdomain = getSubdomain()

    onMounted(() => {
        fetchPaymentMethods()
        fetchOrder()
    })

    const type = computed(() => {
        if (paymentMethod.value === 'counter') {
            return 'counter'
        } else {
            let type = ''
            Object.values(paymentMethods.value).map(data => {
                if (data.id === paymentMethod.value) {
                    type = data.type
                    selectedMethod.value = data
                }
            })
            return type
        }
    })

    async function fetchPaymentMethods() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ subdomain }/payment-method`)
            paymentMethods.value = result.data
            // loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    async function fetchOrder() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ subdomain }/order/${ order_uuid }`)
            order.value = result.data
            console.log('result.data: ', result.data)
            // loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    function CopyToClipboard(id) {
        var r = document.createRange()
        r.selectNode(document.getElementById(id))
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(r)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        $toast.info('Copied', {
            position: "bottom-center"
        })
    }
</script>