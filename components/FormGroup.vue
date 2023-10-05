<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text text-gray-500 font-semibold">{{ label }}</span>
            <!-- <span class="label-text-alt" v-if="topRightLabel !== ''">{{ topRightLabel }}</span> -->
        </label>
        <div class="join flex w-full">
            <button class="btn join-item" v-if="leftAppend !== ''">{{ leftAppend }}</button>
            <!-- <input class="input input-bordered join-item w-full" :placeholder="placeholder"/> -->
            <input type="text" :placeholder="placeholder" class="input input-bordered join-item w-full" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        </div>
    </div>
</template>

<script setup>
    defineProps(['modelValue', 'label', 'placeholder', 'leftAppend'])
    defineEmits(['update:modelValue'])
// export default {
//     props: {
//         leftAppend: { type: String, default: '' },
//         placeholder: String,
//         label: String
//     }
// }
</script>