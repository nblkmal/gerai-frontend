<template>
    <div v-if="store === null">
        Loading gerai
    </div>
    <div v-else class="space-y-4">
        <div class="">
            <img class="rounded-md" src="https://assets.bharian.com.my/images/articles/19gerai_1582081248.jpg" alt="">
        </div>

        <div class="flex justify-between items-center text-left">
            <div class="flex space-x-2">
                <div class="bg-green-200 border border-green-500 rounded-full h-auto w-2"></div>
                <div class="flex flex-col">
                    <h4 class="font-bold">{{ store?.name }}</h4>
                    <p class="text-sm text-left">Nilai, Negeri Sembilan</p>
                    <p class="text-xs text-left">Tags:</p>
                    <div class="flex space-x-1">
                        <Icon name="basil:star-solid" color="orange" />
                        <Icon name="basil:star-solid" color="orange" />
                        <Icon name="basil:star-solid" color="orange" />
                    </div>
                </div>
            </div>
            <Badge name="200m"></Badge>
        </div>

        <h6 class="text-justify text-sm text-gray-500">Warung warisan tok abah yang berada di tepi jalan besar simpang empat. Mempunyai banyak pilihan makanan terutama makanan untuk sarapan pagi.</h6>

        <div class="flex flex-col space-y-2">
            <iconed-label icon="basil:calendar-outline" label="Isnin - Ahad"></iconed-label>
            <iconed-label icon="basil:clock-outline" label="06:00 - 19:00"></iconed-label>
        </div>

        <MapboxMap
            v-if="store !== null"
            :map-id="`map-${ store?.id }`"
            class="h-20 rounded-md"
            :options="{
                style: 'mapbox://styles/nblkmal/ckwyd1xnc06ii15mtmekziiwl', // style URL
                center: [-68.137343, 45.137451], // starting position
                zoom: 5 // starting zoom
            }"
        />

        <reviews></reviews>

        <div class="px-4 fixed bottom-5 left-0 w-full">
            <button class="bg-blue-600 hover:bg-blue-700 flex rounded-md justify-center w-full text-white py-3 px-4 drop-shadow-md">Navigate</button>
        </div>
    </div>
</template>

<style lang="scss">
    // to override maps styling
    .mapboxgl-default-map-size {
        position: sticky !important;
        top: auto !important;
        bottom: auto !important;
        width: 100% !important;
    }
</style>

<script setup lang="js">
import stores from '~/content/stores.json'

    const route = useRoute()
    const id = route.params.id

    const store = ref()

    function findStore(id) {
        return stores.find(store => store.id == id)
    }

    onMounted(() => {
        store.value = findStore(id)
    })

    const { data: currentStore } = await useAsyncData(id, () => {
        return findStore(id)
    })

    useSeoMeta({
        title: () => currentStore.value?.name,
        ogTitle: () => currentStore.value?.name,
        description: () => currentStore.value?.description,
        ogDescription: () => currentStore.value?.description,
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    })
</script>
