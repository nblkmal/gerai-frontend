<template>
    <div class="space-y-4">
        <div class="flex items-center space-x-4">
            <div class="rounded-full border h-16 w-16 flex items-center justify-center">
                <Icon name="basil:image-outline" color="black" height="40%" width="40%"/>
            </div>
            
            <div class="flex flex-col">
                <h4 class="font-bold">Warung Bawah Pokok</h4>
                <p class="text-sm text-left">Nilai, Negeri Sembilan</p>
                <div class="flex space-x-1">
                    <Icon name="basil:star-solid" color="orange" />
                    <Icon name="basil:star-solid" color="orange" />
                    <Icon name="basil:star-solid" color="orange" />
                </div>
            </div>
        </div>

        <div class="collapse collapse-arrow bg-base-200 text-left rounded-md">
            <input type="checkbox" name="my-accordion-2" checked="checked" /> 
            <div class="collapse-title font-medium">
                Customer Details
            </div>
            <div class="collapse-content"> 
                <FormInput label="Name"></FormInput>
            </div>
        </div>

        <div class="flex overflow-auto space-x-2 no-scrollbar">
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
            <Badge name="Phone Repair"></Badge>
        </div>

        <div class="border rounded-md p-4 flex space-x-2">
            <div class="border rounded-md h-20 w-20 flex items-center justify-center">
                <Icon name="basil:image-outline" color="black" height="70%" width="70%"/>
            </div>
            <div class="grow flex flex-row justify-between">
                <div class="flex flex-col text-left">
                    <h4 class="font-semibold">Tukar Bateri</h4>
                    <span class="text-sm text-gray-500">RM 30.00</span>
                </div>

                <div class="flex items-end space-x-2">
                    <div class="rounded-full border border-gray-900 h-7 w-7 flex items-center justify-center">
                        <Icon name="lucide:minus" color="black"/>
                    </div>
                    <div class="rounded-full bg-gray-900 h-7 w-7 flex items-center justify-center">
                        <Icon name="basil:plus-outline" color="white"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 fixed bottom-5 left-0 w-full">
            <button class="bg-blue-600 hover:bg-blue-700 flex items-center rounded-md justify-center w-full text-white py-3 px-4 drop-shadow-md font-bold">
                Checkout
                <Icon name="basil:caret-right-outline" color="white" height="10%" width="10%"/>
                <!-- basil:caret-right-outline -->
            </button>
        </div>
    </div>
</template>

<style lang="scss">
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

      /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>