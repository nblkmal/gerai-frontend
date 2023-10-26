<template>
    <h1 class="text-lg font-semibold pt-8">Find your table here</h1>

    <p class="text-sm text-gray-500 px-4 pb-8">Discover the joy of shopping with a side of comfort and ambiance. Select your ideal table and make your visit truly special.</p>
    <div class="flex overflow-auto space-x-4 bg-gray-100 p-4 rounded-md">
        <label v-for="number in 12" :key="number" :class="`flex items-center justify-center border rounded-full h-8 w-8 p-6 ${ table === number ? 'bg-neutral text-white' : 'bg-white' }`">
            {{ number }}
            <input v-model="table" :value="number" type="radio" class="hidden" />
        </label>
    </div>

    <p v-if="table" class="text-md font-semibold pt-8">{{ toast }}</p>
    
    <div class="px-4 fixed bottom-5 left-0 w-full z-20">
        <NuxtLink :to="`/stores/product/${ useRoute().params.id }`">
            <button @click="setTable" class="bg-neutral flex items-center rounded-md justify-center w-full text-white p-4 drop-shadow-md font-semibold space-x-2">
                <span>Continue Ordering</span>
                <Icon name="icon-park-outline:right-c" color="white"/>
            </button>
        </NuxtLink>
    </div>
</template>

<script>
    import { useCartStore } from '~/store/cart'
    import { mapState } from 'pinia'

    export default {
        computed: {
            ...mapState(useCartStore, ['cart']),
        },

        data() {
            return {
                table: '',
                toast: 'Good choice!'
            }
        },

        watch: {
            table() {
                this.toast = this.toast === 'Good choice!' ? 'Perfect!' : 'Good choice!'
            }
        },

        methods: {
            setTable() {
                useCartStore().setTable(this.table)
            }
        }
    }
</script>