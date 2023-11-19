<template>
    <div onclick="stateModal.showModal()" class="form-control w-full">
        <label class="label">
            <span class="label-text text-gray-500 font-semibold">{{ label }}</span>
        </label>
        <input type="text" :placeholder="placeholder" class="input input-bordered w-full">
    </div>

    <dialog id="stateModal" class="modal">
        <div class="modal-box py-4">
            <div class="modal-action h-40 w-full mt-0">
                <form method="dialog" class="w-full flex flex-col items-center">
                    <!-- <button @click="selectState(item.id)" v-for="item in stateCity" :key="item.id" class="w-full py-2 px-4 font-semibold text-gray-500"> -->
                    <button @click="$emit('update:modelValue', item.id)" v-for="item in selections" :key="item.id" class="w-full py-2 px-4 font-semibold text-gray-500">
                        {{ item.name }}
                    </button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
    defineProps({
        modelValue: String,
        label: String,
        placeholder: String,
        noBorder: Boolean,
        selections: Array
    })
    defineEmits(['update:modelValue'])
</script>