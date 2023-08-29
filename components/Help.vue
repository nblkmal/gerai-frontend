<template>
    <div>
        <button onclick="my_modal_2.showModal()" class="fixed bottom-5 right-3 border-2 rounded-full flex items-center justify-center p-4 h-12 w-12 drop-shadow-md bg-white">
            <Icon class="" name="basil:search-outline" color="gray"/>
        </button>
        <dialog id="my_modal_2" class="modal">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">Can't find anything?</h3>
                <p class="py-4">Start contributing with us at <a href="https://github.com/nblkmal/gerai-frontend/issues">GitHub</a></p>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>