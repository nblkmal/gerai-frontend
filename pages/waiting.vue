<template>
    <div class="flex flex-col justify-center items-center">
        <div @click="fetchQueue" class="border rounded-full flex items-center space-x-2 bg-gray-50 py-1 px-4 mb-4">
            <Icon name="ic:outline-refresh" class="text-gray-400"/>
            <p class="text-gray-600 text-sm">Refresh</p>
        </div>
        <small class="text-gray-500">Your Number</small>
        <h1 class="font-bold text-5xl my-8">{{ queue?.number }}</h1>
        <small v-if="queue.status === 'pending'" class="text-gray-500">Please wait for your number to be called</small>
        <div v-if="waiting !== 0" class="flex items-center space-x-2 border bg-gray-50 rounded-lg py-2 px-4 mt-8">
            <Icon name="icon-park-solid:time" class="text-gray-400"/>
            <p class="text-gray-600">{{ waiting }} more person before your turn</p>
        </div>
        <div v-if="waiting === 0 && queue.status === 'calling'" class="flex items-center space-x-2 border border-green-600 bg-green-50 rounded-lg py-2 px-4 mt-8">
            <Icon name="bxs:bell-ring" class="text-green-600"/>
            <p class="text-green-600 font-semibold">Your turn!</p>
        </div>
        <div v-if="waiting === 0 && queue.status === 'pending'" class="flex items-center space-x-2 border border-yellow-600 bg-yellow-50 rounded-lg py-2 px-4 mt-8">
            <span class="loading loading-dots loading-sm text-yellow-600"></span>
            <p class="text-yellow-600 font-semibold">Waiting any counter to call</p>
        </div>
        <div v-if="queue.status !== 'pending'" class="flex items-center space-x-2 border border-green-600 bg-green-50 rounded-lg py-2 px-4 mt-8">
            <Icon name="teenyicons:tick-circle-solid" class="text-green-600"/>
            <p class="text-green-600 font-semibold">Thank you and come again</p>
        </div>
    </div>
</template>

<script setup>
    const queue = ref({})
    const waiting = ref(0)
    const route = useRoute()
    const router = useRouter()
    const subdomain = getSubdomain()
    const urlBase = inject('urlBase')
    const queue_uuid = 'ref' in route.query ? route.query.ref : null

    onMounted(() => {
        fetchQueue()
    })

    async function fetchQueue() {
        try {
            const result = await $fetch(`${ urlBase }queue/${ subdomain }/${ queue_uuid }/show`)
            queue.value = result.data.queue
            waiting.value = result.data.waiting
            // loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }
</script>