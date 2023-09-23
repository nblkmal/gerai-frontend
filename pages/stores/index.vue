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

        <div v-if="stores.length === 0 && loading" class="animate-pulse border w-full p-4 rounded-md flex flex-row space-x-2">
            <div class="flex-1 bg-gray-100 rounded-md"></div>
            <div class="w-2/3 flex flex-col space-y-2">
                <div class="bg-gray-100 rounded-md w-2/4 p-3"></div>
                <div class="bg-gray-100 rounded-md w-full p-3"></div>
            </div>
        </div>

        <Blank v-if="stores.length === 0 && !loading"
        icon="basil:location-question-outline"
        text="Opps, no search found. Try to search with another keyword."></Blank>

        <NuxtLink :to="`/stores/${store.id}`" class="h-24 flex" v-for="store in stores" :key="store.id">
            <img v-if="store.media && store.media.length !== 0" class="border-l border-y rounded-l-md w-20 h-full object-cover" :src="store.media[0].original_url ?? store.media[0]" alt="">
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
    import storesJson from '~/content/stores.json'
    import keywordsJson from '~/static/keywords.json'
    export default {
        inject: ['urlBase'],

        data() {
            return {
                stores: [],
                filters: {},
                loading: true,
                storesModel: []
            }
        },

        mounted() {
            this.keywords.forEach(category => {
                this.filters[category] = false
            })

            this.fetchVendors()

            if (useAuth().status.value === 'authenticated') {
                this.fetchMastanahVendors()
            }
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
            // storesModel() {
            //     return this.stores
            // },
            keywords() {
                return keywordsJson.data.keywords
            }
        },

        methods: {
            searchResult(data) {
                this.stores = data.model
            },

            async fetchVendors() {
                const result = await $fetch(`${ this.urlBase }vendors/`)
                this.stores = result.data
                this.storesModel = result.data
                this.loading = false
            },

            async fetchMastanahVendors() {
                const result = await $fetch(`https://mastanah.app/api/v1/vendors`)
                this.stores = [...this.stores, ...result.data.data]
                this.loading = false
            }
        }
    }
</script>