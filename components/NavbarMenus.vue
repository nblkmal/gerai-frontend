<template>
    <ul tabindex="0" :class="className">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/contributor">Be a contributor</NuxtLink></li>
        <!-- <li>
            <NuxtLink
                @click="withSubdomain('hanfix')"
                to="about"
                event="">
                <a>Products</a>
            </NuxtLink>
        </li> -->
        <li><NuxtLink to="/stores">Stores</NuxtLink></li>
        <li><NuxtLink to="/order">Order</NuxtLink></li>
        <li><NuxtLink to="/coupon">Coupon</NuxtLink></li>
        <li><NuxtLink to="/pasar">Pasarhub</NuxtLink></li>
        <!-- <li><NuxtLink to="/maps">Maps</NuxtLink></li> -->
        <!-- <li><NuxtLink to="/stores/overview">Store</NuxtLink></li> -->
    </ul>
</template>

<script>
export default {
    props: {
        className: String
    }
}
</script>