<template>
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost indicator w-12 rounded-full group">
            <div class="w-10 rounded-full">
                <span v-if="cart.length !== 0" class="indicator-item badge badge-primary">{{ cart.length }}</span> 
                <Icon name="solar:cart-large-2-bold-duotone" class="h-6 w-6 rouned-full text-gray-600 group-hover:text-primary"/>
            </div>
        </label>
        <div tabindex="0" class="dropdown-content card card-compact p-2 w-80 shadow bg-white border border-neutral-200 z-10">
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
        </div>
    </div>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    const cart = computed(() => {
        return useCartStore().cart
    })
</script>