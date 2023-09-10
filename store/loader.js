import { defineStore } from 'pinia'

export const useGlobalLoader = defineStore('loader', {
    state: () => ({
        loader: false
    }),
    actions: {
        setLoader(data) {
            this.loader = data
        },
    }
})