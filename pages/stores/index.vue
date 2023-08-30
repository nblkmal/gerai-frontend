<template>
    <Head>
        <Title>Find your gerai | gerai</Title>
        <Meta name="description" content="Find your gerai" />
    </Head>
    <div class="space-y-4">
        <div class="flex">
            <FormSearch :model="storesModel" @indexed="searchResult"></FormSearch>
        </div>

        <div class="flex overflow-auto space-x-2 no-scrollbar">
            <Badge v-for="cat in keywords" :key="cat" :name="cat" :model="filters" :input="cat"></Badge>
        </div>

        <div v-if="stores.length === 0" class="flex flex-col items-center space-y-2">
            <Icon name="basil:location-question-outline" color="gray" height="10%" width="10%"/>
            <span class="text-gray-500">Opps, no search found. Try to search with another keyword.</span>
        </div>
        <NuxtLink :to="`/stores/${store.id}`" class="h-24 flex" v-for="store in stores" :key="store.id">
            <img class="rounded-l-md w-1/4 h-full object-cover" src="https://assets.bharian.com.my/images/articles/19gerai_1582081248.jpg" alt="">
            <div class="border w-full rounded-r-md p-3 text-left truncate">
                <div class="flex justify-between items-center">
                    <h4 class="font-semibold">{{ store.name }}</h4>
                    <small>200m</small>
                </div>
                <small class="truncate">{{ store.description }}</small>
                <p class="text-xs text-left">Tags:
                    <span class="font-semibold" v-for="(key, index) in store.keywords" :key="key">{{ key }}{{ store.keywords.length - index === 1 ? '' : ', ' }}</span>
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
    import storesJson from '~/static/stores.json'
    import keywordsJson from '~/static/keywords.json'
    export default {
        data() {
            return {
                stores: storesJson.data.stores,
                filters: {}
            }
        },

        mounted() {
            this.keywords.forEach(category => {
                this.filters[category] = false
            })
        },

        watch: {
            filters: {
                handler(data) {
                    // for (const item in data) {
                    //     this.stores.filter(store => {
                    //         if (store.keywords.indexOf(item) !== -1) {
                    //             console.log('item: ', item)
                    //         }
                    //     })
                    // }
                },
                deep: true
            }
        },

        computed: {
            storesModel() {
                return storesJson.data.stores
            },
            keywords() {
                return keywordsJson.data.keywords
            }
        },

        methods: {
            searchResult(data) {
                this.stores = data.model
            }
        }
    }
</script>