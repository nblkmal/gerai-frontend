<template>
    <div class="w-full relative">
        <Icon class="absolute mt-4 ml-4" name="basil:search-outline" color="gray"/>
        <input v-model="search" type="text" placeholder="Find your gerai" class="input input-bordered w-full pl-10" />
    </div>
</template>

<script>
export default {
    props: {
        model: { type: Object, required: true }
    },

    data() {
        return {
            search: '',
            indexed: null,
            working: false
        }
    },

    watch: {
        search(data) {
            if (data === '') {
                this.$emit('indexed', this.model)
            }
            this.runSearch(data)
        }
    },

    methods: {
        async runSearch(data) {
            this.working = true
            let newIndex = []
            await this.model.filter(item => {
                if (item.name.toLowerCase().includes(data.toLowerCase())) {
                    newIndex.push(item)
                }
            })
            this.working = false
            this.$emit('indexed', newIndex)
        }
    }
}
</script>