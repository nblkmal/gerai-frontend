<template>
    <div class="space-y-4">
        <div class="flex">
            <FormSearch :model="storesModel" @indexed="searchResult"></FormSearch>
        </div>

        <div class="flex overflow-auto space-x-2 no-scrollbar">
            <Badge v-for="cat in categories" :key="cat" :name="cat" :model="category" :input="cat"></Badge>
        </div>

        <div v-if="stores.length === 0" class="flex flex-col items-center space-y-2">
            <Icon name="basil:document-outline" @click="clearSearch" color="gray" height="10%" width="10%"/>
            <span class="text-gray-500">Opps, no search found</span>
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
            categories: [
                'repair', 'clean', 'screen', 'coat'
            ],
            category: {}
        }
    },

    mounted() {
        this.categories.forEach(category => {
            this.category[category] = false
        })
    },

    computed: {
        storesModel() {
            return storesJson.data.stores
        }
    },

    methods: {
        searchResult(data) {
            this.stores = data
        }
    }
}
</script>