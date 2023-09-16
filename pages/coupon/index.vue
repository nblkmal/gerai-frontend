<template>
    <h1 class="text-left font-bold text-lg">Redeem Coupon</h1>

    <FormSearch model="" @indexed="searchResult" clearable></FormSearch>

    <div class="tabs tabs-boxed flex justify-items-stretch">
        <label
            v-for="item in couponSelection" :key="item.slug"
            :class="`tab flex-auto ${ selection === item.slug ? `tab-active-${ item.color }` : '' }`">
            <input type="radio" name="selection" v-model="selection" :value="item.slug" class="hidden"  />
            {{ item.label }}
        </label>
    </div>

    <CouponTicket></CouponTicket>
    <CouponTicket status="new"></CouponTicket>
    <CouponTicket></CouponTicket>

    <!-- <Icon name="mingcute:coupon-line" color="orange" /> -->
    <Blank icon="mingcute:coupon-line" text="No coupon available yet"></Blank>

</template>

<style lang="scss" scoped>
    .tab-active-neutral {
        @apply bg-neutral text-white;
    }

    .tab-active-primary {
        @apply bg-primary text-white;
    }

    .tab-active-error {
        @apply bg-error text-white;
    }
</style>

<script>
    export default {
        data() {
            return {
                selection: 'available',
                couponSelection: [
                    {
                        slug: 'available',
                        color: 'primary',
                        label: 'Available'
                    },
                    {
                        slug: 'redeemed',
                        color: 'neutral',
                        label: 'Redeemed'
                    },
                    {
                        slug: 'expired',
                        color: 'error',
                        label: 'Expired'
                    }
                ]
            }
        }
    }
</script>