<template>
    <div class="dropdown dropdown-end">
        <CartLabel class="flex md:hidden" onclick="cartModal.showModal()"></CartLabel>
        <CartLabel class="hidden md:flex"></CartLabel>
        <!-- desktop cart -->
        <div tabindex="0" class="hidden md:block dropdown-content card card-compact p-2 w-80 shadow bg-white border border-neutral-200 z-10">
            <CartItems></CartItems>
        </div>
    </div>

    <!-- mobile cart -->
    <dialog id="cartModal" class="modal">
        <div class="modal-box">
            <CartItems></CartItems>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<script setup>
    import { useCartStore } from '~/store/cart'

    onMounted(() => {
        useCartStore().checkCart()
    })
    let cart = ref([])
    cart = computed(() => {
        return useCartStore().cart ? useCartStore().cart : []
    })
</script>