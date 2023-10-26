<template>
    <div class="form-control w-full ">
        <label class="label">
            <span class="label-text text-gray-500 font-semibold">{{ label }}</span>
            <!-- <span class="label-text-alt" v-if="topRightLabel !== ''">{{ topRightLabel }}</span> -->
        </label>
        <select class="select w-full">
            <option disabled selected>Pick your favorite Simpson</option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
        </select>
    </div>
</template>

<script setup>
    defineProps({
        modelValue: String,
        label: String,
        placeholder: String,
        noBorder: Boolean
    })
    defineEmits(['update:modelValue'])
</script>