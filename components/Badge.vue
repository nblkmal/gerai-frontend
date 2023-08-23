<template>
    <div class="border rounded-full px-4 h-full whitespace-nowrap">
        <span :class='className'>{{ name }}</span>
    </div>
</template>

<script>
export default {
    props: {
        bold: { type: Boolean, default: false },
        name: String
    },

    computed: {
        className() {
            return `text-sm ${this.bold ? 'text-bold' : ''}`
        }
    }
}
</script>