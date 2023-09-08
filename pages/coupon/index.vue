<template>
    <h1 class="text-left font-bold text-lg">Redeem Coupon</h1>

    <FormSearch model="" @indexed="searchResult" clearable></FormSearch>

    <CouponTicket></CouponTicket>
    <CouponTicket></CouponTicket>
    <CouponTicket></CouponTicket>

    <!-- <Icon name="mingcute:coupon-line" color="orange" /> -->
    <Blank icon="mingcute:coupon-line" text="No coupon available yet"></Blank>

</template>