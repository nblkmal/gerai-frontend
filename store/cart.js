import { defineStore } from 'pinia'
// import Vue from "vue"
// import Toast from "vue-toastification"
import * as vt from 'vue-toastification'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: []
    }),
    actions: {
        checkCart() {
            this.cart = JSON.parse(localStorage.getItem('cart'))
        },
        add(item) {
            this.cart.push({ ...item, quantity: 1 })
            // vt.default({
            //     transition: "Vue-Toastification__slideBlurred"
            // })
            localStorage.setItem('cart', JSON.stringify(this.cart))
            vt.useToast().success('Added to cart', {
                position: "bottom-center"
            })
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
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
    }
})