<template>
    <div class="flex flex-col items-center space-y-2">
        <Icon :name="icon" color="gray" height="10%" width="10%"/>
        <span class="text-gray-500">{{ text }}</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        icon: String,
        text: String
    })
</script>