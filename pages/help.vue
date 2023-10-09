<template>
    <h1 class="text-lg font-semibold mb-12 mt-6">Need help ?</h1>

    <div class="text-left">
        <h2 class="text-md font-semibold">Frequently Asked Questions</h2>
        <div v-for="item in contents" :key="item.question" class="collapse collapse-arrow rounded-none">
            <input type="checkbox" /> 
            <div class="collapse-title text-md font-medium">
                {{ item.question }}
            </div>
            <div class="collapse-content"> 
                <p class="text-sm text-gray-500">{{ item.answer }}</p>
            </div>
        </div>

        <hr class="mb-4">
        <div class="flex flex-col space-y-4">
            <h2 class="text-md font-semibold">Contact our support</h2>
            <p class="text-gray-500 text-sm">Please do not hesitate to contact us through email at managegerai@gmail.com</p>
        </div>
    </div>


</template>

<script setup>
    const contents = ref(
        [
            {
                question: 'How to be one of the vendors?',
                answer: 'You can email your enquiry at managegerai@gmail.com'
            },
            {
                question: 'How to',
                answer: 'Macamni'
            }
        ]
    )
</script>