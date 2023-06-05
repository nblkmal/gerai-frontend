<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <a class="btn btn-ghost normal-case text-xl">gerai.io</a>
            <div class="badge badge-accent badge-outline">beta</div>
        </div>

        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a>Be a contributor</a></li>
                <li><a>Category</a></li>
                <li><a>Billboard</a></li>
            </ul>
        </div>

        <div class="navbar-end gap-2">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>

            <input @click="toggleTheme" type="checkbox" class="toggle" :checked="theme === 'dark'" />

            <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <a class="justify-between">
                    Profile
                    <span class="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        theme: String
    },

    methods: {
        toggleTheme() {
            this.$emit('toggleTheme', true)
        }
    }
}
</script>
