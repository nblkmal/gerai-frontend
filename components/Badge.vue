<template>
    <label :class="`border ${ labelClass } ${model !== null && model[input] ? 'border-blue-700 bg-blue-100' : ''} rounded-full px-4 py-1 h-full whitespace-nowrap items-center flex space-x-2`" :for="input">
        <Icon v-if="icon !== null" :name="icon" color="gray"/>
        <p :class="className">{{ name }}</p>
        <Icon v-if="redirect" name="basil:caret-right-outline" color="gray"/>
        <input v-if="model !== null" type="checkbox" v-model="model[input]" :name="input" :id="input" class="hidden"/>
    </label>
</template>

<script>
export default {
    props: {
        bold: { type: Boolean, default: false },
        redirect: { type: Boolean, default: false },
        icon: { type: String, default: null },
        name: String,
        model: { type: Object, default: null, required: false },
        input: String,
        type: String,
        text: { type: String, default: '' }
    },

    computed: {
        className() {
            return `text-sm ${ this.text } ${this.bold ? 'font-semibold' : ''}`
        },

        labelClass() {
            let types = {
                'success': 'border-green-500 bg-green-50 text-green-700',
                'warning': 'border-yellow-500 bg-yellow-50 text-yellow-700',
                'error': 'border-red-500 bg-red-50 text-red-700',
            }

            return this.type ? types[this.type] : ''
        }
    }
}
</script>