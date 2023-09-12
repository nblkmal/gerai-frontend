import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: []
    }),
    actions: {
        add(item) {
            this.cart.push({ ...item, quantity: 1 })
        },
        async remove(item) {
            let temp = []
            await this.cart.forEach(data => {
                if (item.id !== data.id) {
                    // need to retain quantity later
                    temp.push({ ...data, quantity: 1 })
                }
            })
            this.cart = temp
        },
    }
})