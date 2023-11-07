<template>
    <!-- <div class="px-4">
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>
    </div> -->
    <!-- <div class="skeu p-7">
        sjasc
    </div> -->
    <div class="hero py-14">
        <div class="hero-content text-center">
            <div class="max-w-md flex flex-col items-center">
                <img src="/navigation.svg" class="h-40 mb-8" alt="">
                <h1 class="text-5xl font-bold">{{ title }}</h1>
                <div class="flex space-x-2 pt-4 justify-center md:justify-end w-full">
                    <img src="/dashed-underline.svg" class="h-2 md:pr-10" alt="">
                </div>
                <p class="py-6">We upgrade your <span>gerai</span> the its full potential by Unlock Success for Your Business with an All-in-One Solution: Online Menus, WhatsApp Ordering, and More!</p>
                <!-- <FormSearch :model="storesModel" @indexed="searchResult" clearable></FormSearch>
                <div class="mt-4 space-y-4 h-30 overflow-auto">
                    <div v-for="(chat, index) in chats" :key="chat">
                        <div v-if="chats.length - index <= 2" :class="`chat ${chatBubble === 'left' ? 'chat-start' : 'chat-end'} w-2/3 flex`">
                            <div class="chat-bubble">{{ chat.message }}</div>
                            <small>{{ chat.time }}</small>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

    <div class="flex justify-center">
        <div class="flex items-center border group border-yellow-500 hover:bg-yellow-500 rounded-full py-2 px-4 space-x-2 animate-bounce">
            <Icon class="text-yellow-500 group-hover:text-white" name="iconoir:star-solid"/>
            <span class="font-semibold text-yellow-500 group-hover:text-white">Book a demo</span>
        </div>
    </div>

    <div class="pb-16">
        <div class="flex justify-center py-8">
            <h1 class="text-3xl font-bold flex items-center space-x-2">
                <span>What do we offer</span>
                <img src="/question-mark.svg" class="h-8" alt="">
                <img src="/question-mark.svg" class="h-6" alt="">
            </h1>
        </div>
        <div class="flex flex-col justify-center space-y-12">
            <!-- menu -->
            <div class="flex flex-col md:flex-row justify-between p-4 md:space-x-8">
                <img src="/browse-menu.svg" class="h-40 my-4 mx-8 md:pl-24" alt="">
                <div class="flex flex-col max-w-2xl">
                    <h2 class="font-bold text-2xl text-neutral mb-4 flex items-center md:-ml-10 space-x-4">
                        <img src="/arched-arrow.svg" class="md:hidden h-10 pb-4" alt="">
                        <img src="/arrow.svg" class="hidden md:block h-4" alt="">
                        <span>In-App Menu</span>
                    </h2>
                    <p class="text-justify">Introducing a game-changing feature that will revolutionize the way your vendors promote their products and boost your shop's sales. With our Vendor-Hosted Menu Listings, you can now provide your vendors with a powerful tool to display their products in a visually appealing and organized manner, helping them connect with customers and generate more revenue.</p>
                </div>
            </div>
            <!-- ws order -->
            <div class="flex flex-col md:flex-row justify-between p-4 md:space-x-8">
                <img src="/order-chat.svg" class="h-40 my-4 mx-8 md:pl-24" alt="">
                <div class="flex flex-col max-w-2xl">
                    <h2 class="font-bold text-2xl text-neutral mb-4 flex items-center md:-ml-10 space-x-4">
                        <img src="/arched-arrow.svg" class="md:hidden h-10 pb-4" alt="">
                        <img src="/arrow.svg" class="hidden md:block h-4" alt="">
                        <span>WhatsApp Ordering</span>
                    </h2>
                    <p class="text-justify">Revolutionize the way your vendors place orders with our new WhatsApp Integration feature. Now, vendors can effortlessly submit orders to your shop, streamlining the ordering process and making it more convenient than ever.</p>
                </div>
            </div>
            <!-- inventory -->
            <div class="flex flex-col md:flex-row justify-between p-4 md:space-x-8">
                <img src="/inventory.svg" class="h-40 my-4 mx-8 md:pl-12" alt="">
                <div class="flex flex-col max-w-2xl">
                    <h2 class="font-bold text-2xl text-neutral mb-4 flex items-center md:-ml-10 space-x-4">
                        <img src="/arched-arrow.svg" class="md:hidden h-10 pb-4" alt="">
                        <img src="/arrow.svg" class="hidden md:block h-4" alt="">
                        <span>Inventory Forecast</span>
                    </h2>
                    <p class="text-justify">Revolutionize the way your vendors place orders with our new WhatsApp Integration feature. Now, vendors can effortlessly submit orders to your shop, streamlining the ordering process and making it more convenient than ever.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="flex justify-center">
        <h1 class="text-3xl font-bold flex items-center space-x-2">
            <span>Whats the catch for joining us</span>
            <img src="/question-mark.svg" class="h-8" alt="">
            <img src="/question-mark.svg" class="h-6" alt="">
        </h1>
    </div>
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
        <div class="card w-auto glass">
            <div class="card-body">
                <h2 class="font-bold text-lg text-center">Points for every review</h2>
                <p>Food hunters! Get rewarded for sharing your restaurant reviews! Help others discover great eats and earn points towards your next meal.</p>
            </div>
        </div>
        <div class="card w-auto glass">
            <div class="card-body">
                <h2 class="font-bold text-lg text-center">Be recognize!</h2>
                <p>Be recognized as a top reviewer in the community! Share your insights, build your reputation, and inspire others to discover new and exciting dining experiences.</p>
            </div>
        </div>
        <div class="card w-auto glass">
            <div class="card-body">
                <h2 class="font-bold text-lg text-center">Join the community</h2>
                <p>Join our community of foodies! Discover new restaurants, share your favorite spots, and earn rewards along the way.</p>
            </div>
        </div>
    </div>

    <div class="flex flex-col md:flex-row bg-neutral rounded-xl justify-between py-8 px-6 items-center space-y-4 md:space-y-0">
        <div class="flex-col">
            <p class="text-white font-bold">Discovered new hidden gem?</p>
            <p class="text-white">Be the first to publish the new gerai to the community. Help others to discover more!</p>
        </div>
        <button class="btn bg-white text-neutral capitalize">Submit your suggestion</button>
    </div>
</template>

<style>
    .skeu {
        border-radius: 50px;
background: #ffffff;
box-shadow:  -40px 40px 80px #bebebe,
             40px -40px 80px #ffffff;
    }
</style>

<script>
    import storesJson from '~/static/stores.json'
    export default {
        data() {
            return {
                title: 'Welcome to gerai',
                results: 0,
                notFound: false,
                chatBubble: 'right',
                chats: []
            }
        },

        computed: {
            storesModel() {
                return storesJson.data.stores
            }
        },

        methods: {
            searchResult(emission) {
                if (emission.model.length !== this.results) {
                    this.toggleBubble()
                }
                this.results = emission.model.length
                this.notFound = emission.noResult

                const time = new Date()
                const now = `${ time.getHours() }:${ time.getMinutes() }`

                // if (!this.notFound && this.results.length === 0) {
                //     this.chats = []
                // } else {
                    let list = {
                        message: this.notFound ? 'No result found' : `We found ${ this.results } results`,
                        time: now
                    }
                    this.chats.push(list)
                // }
            },

            toggleBubble() {
                this.chatBubble = this.chatBubble === 'right' ? 'left' : 'right'
            }
        }
    }
</script>