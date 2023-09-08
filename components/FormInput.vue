<template>
    <div class="form-control w-full ">
        <label class="label">
            <span class="label-text">{{ label }}</span>
            <span class="label-text-alt" v-if="topRightLabel !== ''">{{ topRightLabel }}</span>
        </label>
        <input type="text" :placeholder="placeholder" class="input input-bordered w-full " />
        <label class="label" v-if="bottomLeftLabel !== '' || topLeftLabel !== ''">
            <span class="label-text-alt" v-if="bottomLeftLabel !== ''">{{ bottomLeftLabel }}</span>
            <span class="label-text-alt" v-if="topLeftLabel !== ''">{{ topLeftLabel }}</span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        placeholder: { type: String, default: 'Type here' },
        topRightLabel: { type: String, default: '' },
        bottomRightLabel: { type: String, default: '' },
        bottomLeftLabel: { type: String, default: '' },
    }
}
</script>