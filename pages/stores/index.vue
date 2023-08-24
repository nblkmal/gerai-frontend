<template>
    <div class="space-y-4">
        <div class="flex">
            <input v-model="search" type="text" placeholder="Find your gerai" class="input input-bordered w-full" />
        </div>
        <NuxtLink :to="`/stores/${store.id}`" class="h-24 flex" v-for="store in stores" :key="store.id">
            <img class="rounded-l-md w-1/4 h-full object-cover" src="https://assets.bharian.com.my/images/articles/19gerai_1582081248.jpg" alt="">
            <div class="border w-full rounded-r-md p-3 text-left truncate">
                <div class="flex justify-between items-center">
                    <h4 class="font-semibold">{{ store.name }}</h4>
                    <small>200m</small>
                </div>
                <small class="truncate">{{ store.description }}</small>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
import storesJson from '~/static/stores.json'
export default {
    data() {
        return {
            stores: storesJson.data.stores,
            search: ''
        }
    },

    mounted() {
        // console.log('stores: ', stores)
    },

    watch: {
        search(data) {
            if (data === '') {
                this.stores = storesJson.data.stores
            }
            let newIndex = []
            this.stores.filter(store => {
                if (store.name.toLowerCase().includes(data.toLowerCase())) {
                    newIndex.push(store)
                }
            })
            this.stores = newIndex
        }
    }
}
</script>