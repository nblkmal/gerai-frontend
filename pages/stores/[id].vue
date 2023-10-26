<template>
    <div v-if="loading" class="animate-pulse w-full space-y-4">
        <div class="flex justify-between">
            <div class="w-2/4 bg-gray-100 rounded-full p-4"></div>
            <div class="w-1/4 bg-gray-100 rounded-full p-4"></div>
        </div>
        <div class="bg-gray-100 h-60 rounded-md"></div>
    </div>
    <div v-else class="space-y-4">
        <div class="flex justify-between">
            <NuxtLink :to="`/stores/product/${store?.id}`">
                <Badge :type="shopOpen ? 'success' : 'error'" :name="shopOpen ? 'Open' : 'Currently Closed'" :text="shopOpen ? 'text-green-700' : 'text-red-700'" bold></Badge>
            </NuxtLink>
            <NuxtLink :to="`/stores/product/${store?.id}`">
                <Badge redirect name="See products" icon="basil:shopping-bag-solid"></Badge>
            </NuxtLink>
        </div>
        <!-- <div> -->
            <!-- <img class="rounded-md h-40 w-full object-cover" :src="store?.media[0].original_url ?? store?.media[0]" alt=""> -->
        <!-- </div> -->
        <div class="carousel w-full h-80 rounded-lg">
            <div v-if="store?.media.length === 0" class="border rounded-lg w-full h-full">
                <!-- <Icon name="iconamoon:star-duotone" color="orange"/> -->
            </div>
            <div v-else v-for="(img, index) in store?.media" :key="index" :id="`slide${ index }`" class="carousel-item relative w-full">
                <img :src="img.original_url ?? img" class="w-full object-cover" />
                <!-- <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a :href="`#slide${ index == 0 ? index.length - 1 : index - 1 }`" class="btn btn-circle bg-gray-50 opacity-30">❮</a> 
                    <a :href="`#slide${ index + 1 }`" class="btn btn-circle bg-gray-50 opacity-30">❯</a>
                </div> -->
            </div>
        </div>

        <div class="flex justify-between items-center text-left">
            <div class="flex space-x-2">
                <div class="bg-green-200 border border-green-500 rounded-full h-auto w-2"></div>
                <div class="flex flex-col">
                    <h4 class="font-bold">{{ store?.name }}</h4>
                    <p class="text-sm text-left">{{ store?.description }}</p>
                    <!-- <p class="text-xs text-left">Tags:</p>
                    <div class="flex space-x-1">
                        <Icon name="basil:star-solid" color="orange" />
                        <Icon name="basil:star-solid" color="orange" />
                        <Icon name="basil:star-solid" color="orange" />
                    </div> -->
                </div>
            </div>
            <div class="flex space-x-2">
                <a :href="store?.mapsUrl" target="__blank" class="border rounded-full flex items-center justify-center p-2">
                    <Icon name="ion:navigate" color="gray"/>
                </a>

                <div onclick="share.showModal()" class="border rounded-full flex items-center justify-center p-2">
                    <Icon name="majesticons:share" color="gray"/>
                </div>
            </div>
        </div>

        <h6 class="text-justify text-sm text-gray-500">
            {{ store?.description }}
        </h6>

        <div class="flex flex-col space-y-2">
            <iconed-label icon="basil:calendar-outline" :label="`Except ${ store?.dayClose?.toString() }`"></iconed-label>
            <iconed-label icon="basil:clock-outline" :label="`${ $time(store?.timeOpen, 'HH.mm') } - ${ $time(store?.timeClose, 'HH.mm') }`"></iconed-label>
        </div>

        <reviews :reviews="store?.reviews"></reviews>

        <!-- <div class="px-4 fixed bottom-5 left-0 w-full flex space-x-2"> -->
            <!-- <a :href="store?.mapsUrl" target="__blank" class="flex-1 rounded-md bg-blue-600 text-white font-semibold flex items-center justify-center py-2">
                View in Google Maps
            </a> -->
            <!-- <div class="w-16 h-auto">
                <button onclick="share.showModal()" class="bg-white border border-blue-600 p-2 rounded-full w-full flex items-center justify-center h-auto">
                    <Icon name="icon-park-solid:share-one" color="blue"/>
                </button>
            </div> -->
        <!-- </div> -->
    </div>

    <dialog id="share" class="modal">
        <div class="modal-box space-y-4">
            <h3 class="font-bold text-lg">Share with your friends!</h3>
            <p class="py-4 text-gray-500">Tell your friends about this hidden gems that you want to recommend!</p>

            <span class="text-sm text-gray-500">Share on social media :</span>
            <div class="bg-blue-100 rounded-md p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="simple-icons:facebook"/>
                <span>Facebook</span>
            </div>
            <a :href="`https://twitter.com/intent/tweet?text=${ encodedShare }`" target="__blank" class="bg-blue-50 rounded-md p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="codicon:twitter"/>
                <span>Twitter</span>
            </a>
            <!-- <div class=" bg-purple-100 rounded-md p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="ri:instagram-fill"/>
                <span>Instagram</span>
            </div> -->
            <div class=" bg-green-100 rounded-md p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="mingcute:whatsapp-fill"/>
                <span>WhatApp</span>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
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
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const { currentRoute } = router

    const store = ref()
    const urlBase = inject('urlBase')
    const loading = ref(true)

    onMounted(() => {
        fetchVendor()
    })

    const encodedShare = computed(() => {
        return `Checkout https://gerai.store/stores/${ id }`
    })

    async function fetchVendor() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ id }/show`)
            console.log('result: ', result)
            store.value = result.data
            loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const { $now } = useNuxtApp()
    const shopOpen = computed(() => {
        return $now > store?.value?.timeOpen && $now < store?.value?.timeClose
    })

    // this is for seo
    const { data: currentStore } = await useAsyncData(id, () => {
        return fetchVendor()
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
