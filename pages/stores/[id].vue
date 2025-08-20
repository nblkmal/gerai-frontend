<template>
    <Head>
        <Title>{{ store?.name || 'Store Details' }} | gerai</Title>
        <Meta name="description" :content="store?.description || 'Find your gerai'" />
    </Head>
    
    <div v-if="loading" class="animate-pulse w-full space-y-4">
        <div class="flex justify-between">
            <div class="w-2/4 bg-gray-100 rounded-full p-4"></div>
            <div class="w-1/4 bg-gray-100 rounded-full p-4"></div>
        </div>
        <div class="bg-gray-100 h-60 rounded-lg"></div>
    </div>
    <div v-else class="space-y-4">
        <div class="flex justify-between">
            <Badge :type="shopOpen ? 'success' : 'error'" :name="shopOpen ? 'Open' : 'Currently Closed'" :text="shopOpen ? 'text-green-700' : 'text-red-700'" bold></Badge>
            <NuxtLink :to="`/stores/product/${ store?.slug }`">
                <Badge redirect name="See products" icon="basil:shopping-bag-solid"></Badge>
            </NuxtLink>
        </div>
        
        <div class="carousel w-full h-80 rounded-lg">
            <div v-if="!store?.media || store.media.length === 0" class="border rounded-lg w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div class="text-center">
                    <!-- <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                        <Icon name="basil:store-outline" class="text-4xl text-gray-500" />
                    </div> -->
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">No Images Available</h3>
                    <p class="text-gray-500 text-sm">This store hasn't uploaded any photos yet</p>
                </div>
            </div>
            <div v-else v-for="(img, index) in store.media" :key="index" :id="`slide${ index }`" class="carousel-item relative w-full">
                <img :src="img.original_url" :alt="`${store.name} - Image ${index + 1}`" class="w-full h-full object-cover" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a :href="`#slide${ index === 0 ? store.media.length - 1 : index - 1 }`" class="btn btn-circle bg-gray-50 opacity-30">❮</a> 
                    <a :href="`#slide${ index === store.media.length - 1 ? 0 : index + 1 }`" class="btn btn-circle bg-gray-50 opacity-30">❯</a>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center text-left">
            <div class="flex space-x-2">
                <div class="bg-green-200 border border-green-500 rounded-full h-auto w-2"></div>
                <div class="flex flex-col">
                    <h4 class="font-bold text-lg">Game Hub Store</h4>
                    <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <div class="flex space-x-1 mt-2">
                        <span v-for="keyword in store?.keywords" :key="keyword" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {{ keyword }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <a :href="store?.mapsUrl" target="_blank" class="border rounded-full flex items-center justify-center p-2 hover:bg-gray-50">
                    <Icon name="ion:navigate" color="gray"/>
                </a>

                <div onclick="share.showModal()" class="border rounded-full flex items-center justify-center p-2 hover:bg-gray-50 cursor-pointer">
                    <Icon name="majesticons:share" color="gray"/>
                </div>
            </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
            <h6 class="text-justify text-sm text-gray-700 mb-3">
                {{ store?.description }}
            </h6>
            
            <div class="flex flex-col space-y-2">
                <iconed-label icon="basil:calendar-outline" :label="`Closed on: ${ store?.dayClose?.join(', ') || 'No closing days' }`"></iconed-label>
                <iconed-label icon="basil:clock-outline" :label="`Open: ${ formatTime(store?.timeOpen) } - ${ formatTime(store?.timeClose) }`"></iconed-label>
                <iconed-label icon="basil:location-outline" :label="`Location: ${ store?.geolocation || 'Location not available' }`"></iconed-label>
            </div>
        </div>

        <reviews :reviews="dummyReviews"></reviews>
    </div>

    <dialog id="share" class="modal">
        <div class="modal-box space-y-4">
            <h3 class="font-bold text-lg">Share with your friends!</h3>
            <p class="py-4 text-gray-500">Tell your friends about this hidden gems that you want to recommend!</p>

            <span class="text-sm text-gray-500">Share on social media :</span>
            <div class="bg-blue-100 rounded-lg p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="simple-icons:facebook"/>
                <span>Facebook</span>
            </div>
            <a :href="`https://twitter.com/intent/tweet?text=${ encodedShare }`" target="__blank" class="bg-blue-50 rounded-lg p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="codicon:twitter"/>
                <span>Twitter</span>
            </a>
            <!-- <div class=" bg-purple-100 rounded-lg p-2 font-semibold flex items-center justify-center space-x-2">
                <Icon name="ri:instagram-fill"/>
                <span>Instagram</span>
            </div> -->
            <div class=" bg-green-100 rounded-lg p-2 font-semibold flex items-center justify-center space-x-2">
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

    const urlBase = inject('urlBase')

    const dummyReviews = [

        {
            id: 1,
            user: 'Ahmad',
            rating: 5,
            comment: 'Excellent service! Fixed my phone screen in just 2 hours.'
        }
    ]

    // Dummy data for vendor details
    const dummyVendors = {
        1: {
            id: 1,
            slug: 'tech-repair-center',
            name: 'Tech Repair Center',
            description: 'Professional mobile phone and computer repair services. We fix screens, batteries, and all types of hardware issues with quick turnaround times.',
            timeOpen: '0900',
            timeClose: '1800',
            dayClose: ['Sunday'],
            geolocation: '3.1390,101.6869',
            mapsUrl: 'https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic',
            media: [
                {
                    original_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
                },
                {
                    original_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
                },
                {
                    original_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
                }
            ],
            keywords: ['repair', 'screen'],
            reviews: [
                {
                    id: 1,
                    user: 'Ahmad',
                    rating: 5,
                    comment: 'Excellent service! Fixed my phone screen in just 2 hours.'
                },
                {
                    id: 2,
                    user: 'Sarah',
                    rating: 4,
                    comment: 'Good quality work, reasonable prices.'
                }
            ]
        },
        2: {
            id: 2,
            slug: 'mobile-app-studio',
            name: 'Mobile App Studio',
            description: 'Custom mobile app development for iOS and Android. We create beautiful, functional apps that help businesses grow.',
            timeOpen: '1000',
            timeClose: '1900',
            dayClose: ['Saturday', 'Sunday'],
            geolocation: '3.0738,101.5183',
            mapsUrl: 'https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic',
            media: [
                {
                    original_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
                },
                {
                    original_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
                }
            ],
            keywords: ['mobile app', 'web'],
            reviews: [
                {
                    id: 3,
                    user: 'John',
                    rating: 5,
                    comment: 'Amazing app development team! Delivered exactly what we needed.'
                }
            ]
        },
        3: {
            id: 3,
            slug: 'beauty-nail-salon',
            name: 'Beauty Nail Salon',
            description: 'Professional nail care and beauty services. We offer manicures, pedicures, nail art, and beauty treatments in a relaxing environment.',
            timeOpen: '1000',
            timeClose: '2000',
            dayClose: ['Monday'],
            geolocation: '3.0562,101.5854',
            mapsUrl: 'https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic',
            media: [
                {
                    original_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop'
                },
                {
                    original_url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&h=600&fit=crop'
                }
            ],
            keywords: ['pedicure', 'nails'],
            reviews: [
                {
                    id: 4,
                    user: 'Lisa',
                    rating: 5,
                    comment: 'Best nail salon in the area! Clean and professional.'
                },
                {
                    id: 5,
                    user: 'Maria',
                    rating: 4,
                    comment: 'Great service and beautiful nail art designs.'
                }
            ]
        },
        4: {
            id: 4,
            slug: 'screen-fix-pro',
            name: 'Screen Fix Pro',
            description: 'Specialized in mobile device screen repairs. Fast, reliable, and affordable screen replacement services for all major brands.',
            timeOpen: '0800',
            timeClose: '1700',
            dayClose: ['Sunday'],
            geolocation: '2.9273,101.7074',
            mapsUrl: 'https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic',
            media: [],
            keywords: ['repair', 'screen'],
            reviews: [
                {
                    id: 6,
                    user: 'David',
                    rating: 5,
                    comment: 'Quick and professional screen repair service.'
                }
            ]
        },
        5: {
            id: 5,
            slug: 'web-development-hub',
            name: 'Web Development Hub',
            description: 'Full-stack web development services. We build modern, responsive websites and web applications using the latest technologies.',
            timeOpen: '0900',
            timeClose: '1800',
            dayClose: ['Saturday', 'Sunday'],
            geolocation: '2.9356,101.6919',
            mapsUrl: 'https://maps.app.goo.gl/HZ88XV51GCm1JnG19?g_st=ic',
            media: [
                {
                    original_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
                },
                {
                    original_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'
                }
            ],
            keywords: ['web', 'mobile app'],
            reviews: [
                {
                    id: 7,
                    user: 'Mike',
                    rating: 5,
                    comment: 'Outstanding web development work. Highly recommended!'
                },
                {
                    id: 8,
                    user: 'Anna',
                    rating: 4,
                    comment: 'Great communication and delivered on time.'
                }
            ]
        }
    }

    // Fetch vendor data using useAsyncData
    const { data: store, pending: loading } = await useAsyncData(`vendor-${id}`, async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('id: ', id)
        const vendorData = dummyVendors[id]
        if (vendorData) {
            console.log('Dummy vendor data: ', vendorData)
            return vendorData
        } else {
            // Handle case when vendor not found
            console.error('Vendor not found')
            throw createError({
                statusCode: 404,
                statusMessage: 'Vendor not found'
            })
        }
    })

    const encodedShare = computed(() => {
        return `Checkout https://gerai.store/stores/${ id }`
    })

    const { $now } = useNuxtApp()
    const shopOpen = computed(() => {
        return $now > store.value?.timeOpen && $now < store.value?.timeClose
    })

    // Format time from HHMM to HH:MM
    const formatTime = (time) => {
        if (!time) return 'N/A'
        const hours = time.substring(0, 2)
        const minutes = time.substring(2, 4)
        return `${hours}:${minutes}`
    }

    useSeoMeta({
        title: () => store.value?.name,
        ogTitle: () => store.value?.name,
        description: () => store.value?.description,
        ogDescription: () => store.value?.description,
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    })
</script>
