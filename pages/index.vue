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
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">{{ title }}</h1>
                <p class="py-6">The fastest way to find the most suitable gerai for you and your family!</p>
                <FormSearch :model="storesModel" @indexed="searchResult" clearable></FormSearch>
                <div class="mt-4 space-y-4 h-30 overflow-auto">
                    <div v-for="(chat, index) in chats" :key="chat">
                        <div v-if="chats.length - index <= 2" :class="`chat ${chatBubble === 'left' ? 'chat-start' : 'chat-end'} w-2/3 flex`">
                            <div class="chat-bubble">{{ chat.message }}</div>
                            <small>{{ chat.time }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex justify-center">
        <h1 class="text-3xl font-bold">Whats the catch for joining us?</h1>
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
                title: 'Welcome to gerai.io',
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