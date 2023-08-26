<template>
    <div class="w-full relative">
        <Icon class="absolute mt-4 ml-4" name="basil:search-outline" color="gray"/>
        <input v-model="search" type="text" placeholder="Find your gerai" class="input input-bordered w-full px-10" />
        <Icon v-if="search !== ''" class="absolute right-0 mt-4 mr-4 border border-red-600 rounded-full" name="basil:cross-outline" @click="clearSearch" color="red"/>
    </div>
</template>

<script>
export default {
    props: {
        model: { type: Object, required: true },
        clearable: { type: Boolean, required: false, default: false}
    },

    data() {
        return {
            search: '',
            indexed: null,
            working: false,
            emission: {
                model: [],
                noResult: false
            } 
        }
    },

    watch: {
        search(data) {
            if (data === '') {
                this.emission.model = this.clearable ? [] : this.model
                this.emission.noResult = false
                this.$emit('indexed', this.emission)
            } else {
                this.runSearch(data)
            }
        }
    },

    methods: {
        clearSearch() {
            this.search = ''
            this.emission.noResult = false
            this.$emit('indexed', this.emission)
        },

        async runSearch(data) {
            this.working = true
            this.emission.model = []
            await this.model.filter(item => {
                if (item.name.toLowerCase().includes(data.toLowerCase())) {
                    this.emission.model.push(item)
                }
            })
            this.working = false
            this.emission.noResult = false
            this.$emit('indexed', this.emission)
            if (this.emission.model.length === 0 && this.search !== '') {
                this.emission.noResult = true
                this.$emit('indexed', this.emission)
            }
        }
    }
}
</script>