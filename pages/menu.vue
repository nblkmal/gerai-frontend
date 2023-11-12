<template>
    <span v-if="loading" id="loader" class="loading loading-dots loading-lg"></span>
    <Menu @loading="toggleLoading" visit-public/>
</template>

<script setup lang="js">
    const loading = ref(true)

    function toggleLoading(data) {
        loading.value = data
    }

</script>
