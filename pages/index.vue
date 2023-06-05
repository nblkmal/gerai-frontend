<template>
    <div class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>This is unreleased beta version of gerai.io</span>
    </div>

    <div class="px-4">
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>
    </div>
    <div class="hero py-14 bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
            <h1 class="text-5xl font-bold">{{ title }}</h1>
            <p class="py-6">The fastest way to find the most suitable gerai for you and your family!</p>
            <button class="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const title = ref('Welcome to gerai.io')
</script>