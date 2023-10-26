<template>
    <div class="flex bg-yellow-50 border border-yellow-500 rounded-md px-4 py-2 items-center space-x-2">
        <Icon name="iconamoon:star-duotone" color="orange" />
        <span class="font-semibold text-yellow-700">Configure your gerai's product</span>
    </div>

    <div class="tabs flex">
        <label v-for="category in categories" :key="category" :class="`tab tab-lifted flex-1 ${ selectedCategory === category ? 'tab-active' : '' }`">
            <input type="radio" name="category" v-model="selectedCategory" :value="category" class="hidden"  />
            {{ category }}
        </label>
        <label :class="`tab flex-1 tab-lifted ${ selectedCategory === 'newCategory' ? 'tab-active' : '' }`">
            <input type="radio" name="category" v-model="selectedCategory" value="newCategory" class="hidden"  />
            Add category
        </label>
        <!-- <a class="tab tab-lifted tab-active flex-1">Add category</a> -->
    </div>

    <form action="POST" @submit.prevent="submitForm">
        <div v-for="category in categories" :key="category">
            <div v-if="selectedCategory === category">
                <div class="space-y-4">
                    <div v-for="product in products[category]" :key="product" class="border rounded-md p-4 flex space-x-2">
                        <!-- <div class="border rounded-md p-4 w-4">

                        </div> -->
                        <div class="flex-1 flex-col space-y-3 text-left">
                            <FormInput v-model="form.products[product.id].name" no-border small :placeholder="product?.name"></FormInput>
                            <FormInput v-model="form.products[product.id].description" no-border small :placeholder="product.description"></FormInput>

                            <div class="flex space-x-2">
                                <FormInput v-model="form.products[product.id].stock" no-border small type="number" label="Stock" :placeholder="product.stock"></FormInput>
                                <FormInput v-model="form.products[product.id].price" no-border small type="number" label="Price" :placeholder="product.price"></FormInput>
                            </div>

                            <span class="font-semibold text-sm">Upload Image</span>
                        </div>

                        <label class="swap swap-rotate">
                            <input type="checkbox" v-model="form.products[product.id].available" />
                            <Icon :class="`${ product.available === 1 || product.available ? 'swap-on' : 'swap-off' } text-green-700`" name="fluent:presence-available-10-filled"/>
                            <Icon :class="`${ product.available === 1 || product.available ? 'swap-off' : 'swap-on' } text-red-500`" name="subway:error" />
                        </label>
                    </div>
                    <div class="border rounded-md p-4">
                        Add new product
                    </div>
                </div>
            </div>
        </div>

        <button class="px-4 fixed bottom-5 left-0 w-full" type="submit">
            <button class="btn btn-neutral btn-block mt-8">
                <span v-if="loading" class="loading loading-dots loading-xs"></span>
                <span v-else>Update Product</span>
            </button>
        </button>
    </form>

    <div v-if="selectedCategory === 'newCategory'">
        <FormInput no-border label="Category" placeholder="Add new category"></FormInput>

        <button class="px-4 fixed bottom-5 left-0 w-full" type="submit">
            <button class="btn btn-neutral btn-block mt-8">
                <span v-if="loading" class="loading loading-dots loading-xs"></span>
                <span v-else>Add new category</span>
            </button>
        </button>
    </div>
</template>

<script setup lang="js">
    import { useGlobalLoader } from '~/store/loader'

    const products = ref()
    const categories = ref([])
    const selectedCategory = ref('newCategory')
    const route = useRoute()
    const loading = ref(true)
    const id = route.params.id
    const urlBase = inject('urlBase')

    onMounted(() => {
        fetchProducts()
    })

    const form = ref({
        products: []
    })

    async function fetchProducts() {
        try {
            const result = await $fetch(`${ urlBase }vendors/${ id }/products`)
            categories.value = Object.keys(result.data)

            products.value = result.data

            categories.value.forEach(items => {
                result.data[items].forEach(item => {
                    form.value.products[String(item.id)] = {
                        id: item.id,
                        name: item.name,
                        product_category_id: item.product_category_id,
                        description: item.description,
                        stock: item.stock,
                        price: item.price,
                        available: item.available === 1,
                        image: item.image
                    }
                })
            })
            loading.value = false
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const submitForm = async() => {
        loading.value = true
        useGlobalLoader().setLoader(true)
        try {
            await $fetch(urlBase + `vendors/${ id }/products/update`, {
                method: 'POST',
                body: form.value
            })
            loading.value = false
            useGlobalLoader().setLoader(false)
        } catch(error) {
            console.log('error: ', error)
            loading.value = false
        }
    }
</script>