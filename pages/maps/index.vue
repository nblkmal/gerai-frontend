<template>
    <MapboxMap
        :map-id="`map-global`"
        class="h-90 -ml-4 z-20"
        :options="options"
    />
</template>

<style lang="scss" scoped>
    .space-y-4 > :not([hidden]) ~ :not([hidden]) {
        margin-top: 0 !important;
    }
</style>

<script setup>
import { GeolocateControl } from 'mapbox-gl'
    useMapbox('map-global', (map) => {
        map.addControl(new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        }))
    })
</script>
<script>
export default {
    data() {
        return {
            options: {
                style: 'mapbox://styles/nblkmal/ckwyd1xnc06ii15mtmekziiwl', // style URL
                center: [-68.137343, 45.137451], // starting position
                zoom: 5 // starting zoom
            }
        }
    }
}
</script>