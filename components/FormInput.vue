<template>
    <div class="form-control w-full ">
        <label class="label">
            <span class="label-text text-gray-500 font-semibold">{{ label }}</span>
            <!-- <span class="label-text-alt" v-if="topRightLabel !== ''">{{ topRightLabel }}</span> -->
        </label>
        <input type="text" :placeholder="placeholder" class="input input-bordered w-full " :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <!-- <label class="label" v-if="bottomLeftLabel !== '' || topLeftLabel !== ''">
            <span class="label-text-alt" v-if="bottomLeftLabel !== ''">{{ bottomLeftLabel }}</span>
            <span class="label-text-alt" v-if="topLeftLabel !== ''">{{ topLeftLabel }}</span>
        </label> -->
    </div>
</template>

<script setup>
    defineProps(['modelValue', 'label', 'placeholder'])
    defineEmits(['update:modelValue'])
</script>