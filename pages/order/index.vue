<template>
    <div class="tabs tabs-boxed flex justify-items-stretch">
        <label :class="`tab flex-auto ${ selection === 'qr' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="qr" class="hidden"  />
            Scan QR Code
        </label>
        <label :class="`tab flex-auto ${ selection === 'gerai' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="gerai" class="hidden"  />
            Quick Order
        </label>
    </div>

    <template v-if="selection === 'gerai'">
        <div class="py-2 rounded-md flex space-x-5 overflow-auto	">
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
        </div>
    </template>
    <template v-if="selection === 'qr'">
        <div class="qr-container">
            <qrcode-stream id="qr-code-stream" @detect="onDetect"></qrcode-stream>
            <span id="loader" class="loading loading-dots loading-lg"></span>
        </div>

        <small class="text-gray-500">Place QR code inside the frame to scan.</small>
        <br>
        <small class="text-gray-500">Please avoid shaking to get results quickly.</small>

        <div class="bg-gray-100 p-4 rounded-md">
            <span v-if="scanResult === ''">Hang on. We are scanning your qr code</span>
            <span v-else>{{ scanResult }}</span>
        </div>
    </template>

</template>

<style lang="scss">
    .qr-container {
        @apply border-2 h-auto w-full mx-auto aspect-square p-4 rounded-lg relative;

        >#qr-code-stream {
            @apply self-center;
            z-index: 2 !important;
        }

        >#loader {
            @apply absolute bottom-0 top-0 right-0 left-0 m-auto;
            z-index: 1;
        }
    }

    #qr-code-stream {
        video {
            @apply rounded-md flex justify-center;
            // border-radius: 10px !important;
        }
    }
</style>

<script>
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

    export default {
        components: {
            QrcodeStream, QrcodeDropZone, QrcodeCapture
        },

        data() {
            return {
                selection: 'gerai',
                scanResult: ''
            }
        },

        methods: {
            onDetect (detectedCodes) {
                console.log('detectedCodes: ', detectedCodes)
                if (detectedCodes) {
                    let url = detectedCodes[0].rawValue
                    // this.checkUrl(url)
                    this.scanResult = url
                }
                // ...
            }

            // checkUrl(url) {

            // }
        }
    }
</script>