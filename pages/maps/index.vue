<template>
    <MapboxMap
        ref="global-map"
        :center="mapCenter"
        class="rounded-md"
        style="height: 41rem;"
        map-style="mapbox://styles/mapbox/streets-v11"
        access-token="pk.eyJ1IjoibmJsa21hbCIsImEiOiJjbGxyZ293aHkwcm1zM2R0aGR3YzU1cGtrIn0.vwZx-2Sq_JKYUcdX5-5qIQ">
        <!-- <MapboxMarker position="[0, 0]" /> -->
        <MapboxGeocoder 
            placeholder="Search your gerai here" countries="my" types="poi" proximity="ip" language="ms"
            @mb-loading="loading => result = loading"/>
        <MapboxGeolocateControl ref="geolocate" :track-user-location="true"/>
    </MapboxMap>
</template>

<script setup>
    import { ref } from 'vue'
    import { MapboxMap, MapboxMarker, MapboxGeocoder, MapboxGeolocateControl } from '@studiometa/vue-mapbox-gl'
    import 'mapbox-gl/dist/mapbox-gl.css'
    import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css'

    const mapboxMap = ref()
    const map = computed(() => mapboxMap.value.map)
    const mapCenter = ref([0, 0])

    const geolocate = ref(null)
    const result = ref(null)
    console.log('result: ', result)
    onMounted(() => {
        // geolocate.value.click()
        console.log('geolocate.value: ', geolocate.value)
    })
</script>