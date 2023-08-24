<template>
    <div class="form-control">
        <label class="label">
            <span class="label-text">{{ label }}</span>
            <!-- <span class="label-text-alt" v-if="topRightLabel !== ''">{{ topRightLabel }}</span> -->
        </label>
        <div class="join flex w-full max-w-xs">
            <button class="btn join-item" v-if="leftAppend !== ''">{{ leftAppend }}</button>
            <input class="input input-bordered join-item w-full" :placeholder="placeholder"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        leftAppend: { type: String, default: '' },
        placeholder: String,
        label: String
    }
}
</script>