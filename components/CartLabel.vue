<template>
    <label tabindex="0" class="btn btn-ghost indicator w-12 rounded-full group">
        <div class="w-10 rounded-full">
            <span v-if="cart.length !== 0" class="indicator-item badge badge-primary">{{ cart.length }}</span> 
            <Icon name="solar:cart-large-2-bold-duotone" class="h-6 w-6 rouned-full text-gray-600 group-hover:text-primary"/>
        </div>
    </label>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    let cart = ref([])
    cart = computed(() => {
        return useCartStore().cart ? useCartStore().cart : []
    })
</script>