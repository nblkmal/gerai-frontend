<template>
    <div class="form-control w-full ">
        <label v-if="label !== ''" class="label">
            <span class="label-text text-gray-500 font-semibold">{{ label }}</span>
            <!-- <span class="label-text-alt" v-if="topRightLabel !== ''">{{ topRightLabel }}</span> -->
        </label>
        <input :type="type" :placeholder="placeholder" :class="`input ${ noBorder ? '' : 'input-bordered'} ${ small ? 'input-xs' : '' } ${ medium ? 'input-sm' : '' } w-full ${errors.length !== 0 && errors[name] ? 'input-error' : ''}`" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <!-- <label class="label" v-if="bottomLeftLabel !== '' || topLeftLabel !== ''">
            <span class="label-text-alt" v-if="bottomLeftLabel !== ''">{{ bottomLeftLabel }}</span>
            <span class="label-text-alt" v-if="topLeftLabel !== ''">{{ topLeftLabel }}</span>
        </label> -->
        <label v-if="errors.length !== 0" class="label">
            <span class="label-text-alt text-red-700">{{ errors[name][0] }}</span>
        </label>
    </div>
</template>

<script setup>
    defineProps({
        modelValue: String,
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: String,
        name: { type: String, default: ''},
        small: Boolean,
        medium: Boolean,
        noBorder: Boolean,
        errors: { type: Object, default: [] }
    })
    defineEmits(['update:modelValue'])
</script>