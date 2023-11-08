<template>
    <div class="border rounded-lg w-full flex indicator">
        <span class="indicator-item flex justify-end">
            <span class="badge badge-primary hidden"></span>
            <span class="badge badge-error hidden"></span>
            <span class="badge badge-neutral hidden"></span>
            <span :class="`badge badge-${ badgeColor[status] }`">{{ status }}</span>
        </span> 
        <div class="border-r-2 border-dashed h-auto w-1/3 p-4 flex items-center justify-center">
            <span class="font-bold text-xl">50%</span>
        </div>
        <div class="p-4 w-2/3 flex justify-between">
            <div class="flex flex-col text-left">
                <p class="font-bold">Nama cuppon</p>
                <small class="text-gray-500">Expires</small>
                <small>20 Aug 2023</small>
            </div>
            <!-- <button>Redeem</button> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .indicator :where(.indicator-item) {
        @apply w-20 mr-8;
    }
</style>

<script setup>
    const props = defineProps({
        status: String
    })

    const badgeColor = {
        'redeemed': 'neutral',
        'new': 'primary',
        'expired': 'error'
    }
</script>