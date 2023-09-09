<template>
    <div class="tabs tabs-boxed flex justify-items-stretch">
        <label :class="`tab flex-auto ${ selection === 'gerai' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="gerai" class="hidden"  />
            Quick Order
        </label>
        <label :class="`tab flex-auto ${ selection === 'qr' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="qr" class="hidden"  />
            Scan QR Code
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
            <qrcode-stream
                id="qr-code-stream"
                @detect="onDetect"
                @camera-on="loadingCamera">
            </qrcode-stream>
            <span v-if="loadCamera" id="loader" class="loading loading-dots loading-lg"></span>
            <Icon v-if="!loadCamera" id="qr-frame" name="streamline:interface-edit-select-frame-cursor-frame-select" color="white"/>

            <div id="qr-status">
                <span>ahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjvaahscascavcjacvjascvvashjcascjascahcjva</span>
                <!-- <span v-if="scanResult === ''">Hang on. We are scanning your qr code</span>
                <span v-else>{{ scanResult }}</span> -->
            </div>
        </div>

        <small class="text-gray-500">Place QR code inside the frame to scan.</small>
        <br>
        <small class="text-gray-500">Please avoid shaking to get results quickly.</small>

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

        >#qr-frame {
            @apply absolute bottom-0 top-0 right-0 left-0 m-auto h-40 w-40;
            z-index: 3;
        }

        >#qr-status {
            @apply absolute bottom-10 right-0 left-0 text-sm text-white truncate px-8;
            z-index: 3;
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
                scanResult: '',
                loadCamera: true
            }
        },

        watch: {
            selection() {
                this.loadCamera = true
            }
        },

        methods: {
            onDetect (detectedCodes) {
                if (detectedCodes) {
                    let url = detectedCodes[0].rawValue
                    // this.checkUrl(url)
                    this.scanResult = url
                }
                // ...
            },

            loadingCamera() {
                console.log('hit')
                this.loadCamera = false
            }

            // checkUrl(url) {

            // }
        }
    }
</script>