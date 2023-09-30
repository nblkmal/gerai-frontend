import { defineStore } from 'pinia'
// import Vue from "vue"
// import Toast from "vue-toastification"
import * as vt from 'vue-toastification'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        vendor_id: null,
        payment_method: null,
        table: null
    }),
    actions: {
        checkCart() {
            this.cart = JSON.parse(localStorage.getItem('cart'))
            this.vendor_id = localStorage.getItem('vendor_id')
        },

        setVendor(id) {
            this.vendor_id = id
            localStorage.setItem('vendor_id', this.vendor_id)
        },

        setPaymentMethod(method) {
            this.payment_method = method
        },

        setTable(table) {
            this.table = table
        },

        add(item) {
            this.cart = this.cart === null ? [] : this.cart
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
            vt.useToast().success('Item removed', {
                position: "bottom-center"
            })
        },

        async removeOne(index) {
            let temp = []
            await this.cart.forEach((data, cartIndex) => {
                if (index !== cartIndex) {
                    // need to retain quantity later
                    temp.push({ ...data, quantity: 1 })
                }
            })
            this.cart = temp
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },

        totalPrice() {
            let total = 0
            this.cart.forEach(data => {
                total = total + parseFloat(data.price)
            })
            return 'RM ' + total.toFixed(2)
        },

        price(amount) {
            return 'RM ' + parseFloat(amount).toFixed(2)
        },

        encodedOrder() {
            let message = 'Order for user%0D%0A%0D%0A'
            this.cart.forEach((data, index) => {
                let itemTitle = `*${ index + 1 }. ${ data.name } (1)*%0D%0A`
                let itemSub = '** ' + (data.note ? data.note : '') + '%0D%0A%0D%0A'
                message = message.concat(itemTitle + itemSub)
            })
            let total = `*Total Amount: RM ${ this.totalPrice() }*%0D%0A%0D%0A`
            let paymentMethod = `*Payment: ${ this.payment_method === 'counter' ? 'At the counter' : 'By DuitNow QR' }*%0D%0A%0D%0A`
            let footer = '_Auto generated from Gerai platform._%0D%0A%0D%0A'
            let visit = '_Visit https://gerai.store for more info._'
            message = message.concat(total + paymentMethod + footer + visit)
            return message
        }
    }
})