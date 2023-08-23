<template>
    <div class="">
        <img class="rounded-md" src="https://assets.bharian.com.my/images/articles/19gerai_1582081248.jpg" alt="">
    </div>

    <div class="flex justify-between items-center">
        <div class="flex space-x-2">
            <div class="bg-green-200 border border-green-500 rounded-full h-auto w-2"></div>
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
        <Badge name="200m"></Badge>
    </div>

    <h6 class="text-justify text-sm text-gray-500">Warung warisan tok abah yang berada di tepi jalan besar simpang empat. Mempunyai banyak pilihan makanan terutama makanan untuk sarapan pagi.</h6>

    <div class="flex flex-col space-y-2">
        <iconed-label icon="basil:calendar-outline" label="Isnin - Ahad"></iconed-label>
        <iconed-label icon="basil:clock-outline" label="06:00 - 19:00"></iconed-label>
    </div>

    <reviews></reviews>

    <div class="px-4 fixed bottom-5 left-0 w-full">
        <button class="bg-blue-600 hover:bg-blue-700 flex rounded-md justify-center w-full text-white py-3 px-4 drop-shadow-md">Navigate</button>
    </div>
</template>