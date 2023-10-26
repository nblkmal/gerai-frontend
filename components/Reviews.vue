<template>
    <div class="text-left space-y-2">
        <h4 class="font-bold">Review</h4>

        <div v-if="reviews.length === 0" class="flex">
            <div class="border rounded-md p-4 w-full text-center">
                <span class="text-sm">No review yet</span>
            </div>
        </div>
        <div v-else class="flex flex-col space-y-4">
            <div v-for="review in reviews" :key="review.id" class="border rounded-md p-4 w-full space-y-2">
                <div class="flex justify-between">
                    <h6 class="font-semibold text-sm">{{ review.reviewer }}</h6>
                    <span class="text-sm">2 weeks ago</span>
                </div>
                <div class="flex space-x-1">
                    <Icon v-for="star in review.rates" :key="star" name="basil:star-solid" color="orange" />
                </div>
                <p class="text-sm text-gray-500">{{ review.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reviews: { type: Array }
    }
}
</script>