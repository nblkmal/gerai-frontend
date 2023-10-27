<template>
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
</template>

<script setup>
    const paymentMethod = ref('')
</script>