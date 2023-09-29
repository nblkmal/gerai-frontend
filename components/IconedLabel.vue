<template>
    <div class="flex items-center space-x-2">
        <Icon :name="icon" :class="`${ iconClass }`" />
        <span :class="`${ labelClass } text-sm text-gray-500`">
            {{ label }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String,
        labelClass: { type: String, default: '' },
        iconClass: { type: String, default: 'text-black-700' }
    }
}
</script>