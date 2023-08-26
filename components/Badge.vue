<template>
    <label :class="`border ${model !== null && model[input] ? 'border-blue-700 bg-blue-100' : ''} rounded-full px-4 py-1 h-full whitespace-nowrap items-center`" :for="input">
        <p :class='className'>{{ name }}</p>
        <input v-if="model !== null" type="checkbox" v-model="model[input]" :name="input" :id="input" class="hidden"/>
    </label>
</template>

<script>
export default {
    props: {
        bold: { type: Boolean, default: false },
        name: String,
        model: { type: Object, default: null, required: false },
        input: String
    },

    computed: {
        className() {
            return `text-sm ${this.bold ? 'text-bold' : ''}`
        }
    }
}
</script>