import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        setUserData(data) {
            this.user = data;
        },
    }
})