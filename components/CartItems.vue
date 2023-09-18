<template>
    <div v-if="cart.length === 0" class="flex flex-col justify-center items-center space-y-4 py-4">
        <Icon name="solar:cart-large-2-bold-duotone" class="h-6 w-6 rouned-full text-gray-600 group-hover:text-primary"/>
        <span class="text-gray-500 font-semibold">Your cart is empty</span>
    </div>
    <template v-else>
        <ul class="menu rounded-box">
            <li v-for="item in cart" :key="item.id">
                <a class="flex justify-between">
                    <span>{{ item.name }}</span>
                    <small>1</small>
                </a>
            </li>
        </ul>
        <div class="flex justify-between items-center px-6 pt-2 border-t -mx-2">
            <div class="flex flex-col">
                <span class="text-sm">Subtotal ({{ cart.length }} item{{ cart.length > 1 ? 's' : ''}})</span>
                <span class="text-primary font-semibold">RM 40.00</span>
            </div>
            <button class="btn btn-sm btn-primary capitalize text-white">
                Checkout
            </button>
        </div>
    </template>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    const cart = computed(() => {
        return useCartStore().cart
    })
</script>