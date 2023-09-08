<template>
    <h1 class="text-left font-bold text-lg -mb-4">Pasarhub</h1>
    <div class="flex items-center">
        <div class="border rounded-full h-12 w-14"></div>
        <FormInput placeholder="What's on your mind?" class="ml-4"></FormInput>
    </div>
    <div class="flex bg-yellow-50 border border-yellow-500 rounded-md px-4 py-2 items-center space-x-2">
        <Icon name="iconamoon:star-duotone" color="orange" />
        <span class="font-semibold text-yellow-700">Be a gerai owner to post here</span>
        <Icon name="iconamoon:arrow-right-2-duotone" class="text-yellow-700" />
    </div>
    <div class="flex border-b -mx-4 px-4">
        <div class="border rounded-full h-12 w-14"></div>
        <div class="w-full text-left ml-4 space-y-2 pb-4">
            <span class="flex items-center justify-between space-x-2">
                <h3 class="font-semibold">Nabil Akmal</h3>
                <small>3 hours ago</small>
            </span>
            <p class="text-gray-500">Today we are having sales! Come join us at Taman Wawasan, Shah Alam at 5pm. See u guys soon</p>
            <div class="flex items-center justify-between space-x-2 pt-4">
                <div class="flex items-center space-x-2">
                    <Icon name="iconamoon:comment-duotone" color="gray" />
                    <small>3 replies</small>
                </div>
                <div class="flex items-center space-x-2">
                    <Icon name="iconamoon:heart-duotone" color="red" height="20" width="20" />
                    <small>3 people liked</small>
                </div>
            </div>
            <!-- <div class="flex justify-between w-3/4">
                <Icon name="basil:reply-solid" color="gray" />
                <Icon name="ph:heart-fill" color="gray" />
                <Icon name="basil:star-solid" color="orange" />
                <Icon name="basil:star-solid" color="orange" />
            </div> -->
        </div>
    </div>
</template>