<template>
    <div class="border rounded-full px-4 h-full">
        <span class="font-bold text-sm">{{ name }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: String
    }
}
</script>