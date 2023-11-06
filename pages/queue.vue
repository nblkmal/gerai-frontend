<template>
    <div class="space-y-6">
        <h1 class="text-lg font-semibold flex items-center space-x-2 text-neutral">
            <Icon name="mdi:ticket-account"/>
            <span>Get in queue by filling up the form</span>
        </h1>
        <FormInput v-model="form.email" label="Email" placeholder="E.g: name@gmail.com"></FormInput>
        <FormInput v-model="form.name" label="Name" placeholder="So we can call you later"></FormInput>
        <div class="flex space-x-4 mb-12">
            <FormGroup placeholder="012345678" v-model="form.phone" type="integer" left-append="+60" label="Phone Number"></FormGroup>
            <FormInput v-model="form.name" label="Identification No." placeholder="Malaysian I/C"></FormInput>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text text-gray-500 font-semibold">Issues</span>
            </label>
            <textarea class="textarea textarea-bordered w-full" v-model="form.issue" placeholder="Add some notes here ..."></textarea>
        </div>

        <button class="btn btn-neutral w-full">Submit</button>

        <div class="flex justify-center ">
            <div class="flex items-center space-x-2 text-gray-400 border rounded-full w-auto pl-2 pr-3 py-1 text-sm">
                <Icon name="material-symbols:electric-bolt-rounded"/>
                <p>Powered by <a href="https://gerai.store" class="font-semibold">gerai</a></p>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .background-custom {
        background: rgb(223,255,242);
        background: linear-gradient(321deg, rgba(223,255,242,1) 0%, rgba(255,252,209,1) 50%, rgba(209,255,253,1) 94%);
    }
</style>

<script setup>
    const form = ref({
        name: '',
        email: '',
        phone: '',
        ic: '',
        issue: ''
    })
</script>