<template>
    <div class="flex items-center space-x-2">
        <Icon :name="icon" color="black" />
        <span class="text-sm text-gray-500">
            {{ label }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String
    }
}
</script>