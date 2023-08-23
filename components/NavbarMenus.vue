<template>
    <ul :class="className">
        <li><a>Be a contributor</a></li>
        <li><a>Category</a></li>
        <li>
            <NuxtLink
                @click="withSubdomain('hanfix')"
                to="about"
                event="">
                <a>Products</a>
            </NuxtLink>
        </li>
        <li><NuxtLink to="/store/product/order">Order</NuxtLink></li>
        <li><NuxtLink to="/store/overview">Store</NuxtLink></li>
    </ul>
</template>

<script>
export default {
    props: {
        className: String
    }
}
</script>