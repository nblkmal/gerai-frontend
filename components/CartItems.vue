<template>
    <div v-if="cart.length === 0" class="flex flex-col justify-center items-center space-y-4 py-4">
        <Icon name="solar:cart-large-2-bold-duotone" class="h-6 w-6 rouned-full text-gray-600 group-hover:text-primary"/>
        <span class="text-gray-500 font-semibold">Your cart is empty</span>
    </div>
    <template v-else>
        <h1 class="font-semibold text-xl">Items to checkout ..</h1>
        <ul class="menu rounded-box -mx-6">
            <li v-for="(item, index) in cart" :key="item.name + item.note">
                <a class="flex justify-between">
                    <Icon @click="removeOne(index)" class="mr-4 text-red-500" name="bi:dash-circle-dotted"/>
                    <div class="flex-1 flex flex-col">
                        <span class="font-semibold">{{ item.name }}</span>
                        <span class="text-gray-500">{{ item.note }}</span>
                    </div>
                    <span>1</span>
                </a>
            </li>
        </ul>
        <div class="flex justify-between items-center px-6 pt-4 border-t -mx-5">
            <div class="flex flex-col">
                <span class="text-sm">Subtotal ({{ cart.length }} item{{ cart.length > 1 ? 's' : ''}})</span>
                <span class="text-primary font-semibold">RM {{ cartStore.totalPrice() }}</span>
            </div>
            <a
                target="__blank"
                :href="`https://wa.me/60124441998?text=${ encodedOrder }`"
                class="btn btn-primary capitalize text-white py-4 flex items-center justify-center align-baseline">
                Checkout
            </a>
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

    const removeOne = (index) => {
        cartStore.removeOne(index)
    }

    const encodedOrder = computed(() => {
        return cartStore.encodedOrder()
    })
</script>