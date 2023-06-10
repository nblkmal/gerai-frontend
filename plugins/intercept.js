import { ofetch } from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
    globalThis.$fetch = ofetch.create({
        onRequest({ request, options }) {
        if (typeof localStorage !== "undefined") {
            options.headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        }
        },
    });
});