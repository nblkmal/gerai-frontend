import { ofetch } from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
    globalThis.$fetch = ofetch.create({
        onRequest({ request, options }) {
            options.method = options.method ? options.method : 'GET'
            
            // const mastanahToken = useAuth().status.value === 'authenticated' ? useAuth().data.value.access_token : null
            // if (mastanahToken) {
            //     options.headers = {
            //         Accept: 'application/json',
            //         Authorization: `Bearer ${ mastanahToken }`
            //     };
            // }

            // if (typeof localStorage !== "undefined" && mastanahToken === null) {
            //     options.headers = {
            //         Authorization: `Bearer ${localStorage.getItem("token")}` ,
            //         Accept: 'application/json'
            //     }
            // }
        },
    });
});