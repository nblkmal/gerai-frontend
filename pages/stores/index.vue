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

        <div v-if="stores.length === 0 && loading" class="animate-pulse border w-full p-4 rounded-lg flex flex-row space-x-2">
            <div class="flex-1 bg-gray-100 rounded-lg"></div>
            <div class="w-2/3 flex flex-col space-y-2">
                <div class="bg-gray-100 rounded-lg w-2/4 p-3"></div>
                <div class="bg-gray-100 rounded-lg w-full p-3"></div>
            </div>
        </div>

        <Blank
            v-if="stores.length === 0 && !loading"
            icon="basil:location-question-outline"
            text="Opps, no search found. Try to search with another keyword.">
        </Blank>

        <NuxtLink :to="`/stores/${store.slug}`" class="h-24 flex" v-for="store in stores" :key="store.id">
            <div class="border-l border-y rounded-l-md w-28 h-full">
                <img v-if="store.media && store.media.length !== 0" class="object-cover rounded-l-md h-full" :src="store.media[0].original_url" :alt="store.name">
                <div v-else class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-l-md">
                </div>
            </div>
            <div class="border w-full rounded-r-md p-3 text-left truncate">
                <div class="flex justify-between items-center">
                    <h4 class="font-semibold">{{ store.name }}</h4>
                    <small>200m</small>
                </div>
                <small class="truncate">{{ store.address }}</small>
                <!-- <p class="text-xs text-left">Tags:
                    <span class="font-semibold" v-for="(key, index) in store.keywords" :key="key">{{ key }}{{ store.keywords.length - index === 1 ? '' : ', ' }}</span>
                </p> -->
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
                // Dummy data for vendors
                const dummyResult = {
                    data: {
                        data: [
                            {
                                id: 1,
                                slug: 'tech-repair-center',
                                name: 'Tech Repair Center',
                                address: '123 Main Street, Kuala Lumpur',
                                media: [
                                    {
                                        original_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop'
                                    }
                                ],
                                keywords: ['repair', 'screen']
                            },
                            {
                                id: 2,
                                slug: 'mobile-app-studio',
                                name: 'Mobile App Studio',
                                address: '456 Tech Avenue, Petaling Jaya',
                                media: [
                                    {
                                        original_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop'
                                    }
                                ],
                                keywords: ['mobile app', 'web']
                            },
                            {
                                id: 3,
                                slug: 'beauty-nail-salon',
                                name: 'Beauty Nail Salon',
                                address: '789 Beauty Lane, Subang Jaya',
                                media: [
                                    {
                                        original_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop'
                                    }
                                ],
                                keywords: ['pedicure', 'nails']
                            },
                            {
                                id: 4,
                                slug: 'screen-fix-pro',
                                name: 'Screen Fix Pro',
                                address: '321 Digital Road, Cyberjaya',
                                media: [],
                                keywords: ['repair', 'screen']
                            },
                            {
                                id: 5,
                                slug: 'web-development-hub',
                                name: 'Web Development Hub',
                                address: '654 Innovation Street, Putrajaya',
                                media: [
                                    {
                                        original_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop'
                                    }
                                ],
                                keywords: ['web', 'mobile app']
                            }
                        ]
                    }
                }
                
                console.log('Dummy result: ', dummyResult)
                this.stores = dummyResult.data.data
                this.storesModel = dummyResult.data
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