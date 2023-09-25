<template>
    <h1 class="text-lg font-bold text-left">Choose how you want to contribute with us, are you a ...</h1>
    <div class="tabs tabs-boxed flex justify-items-stretch">
        <label :class="`tab flex-auto ${ selection === 'visitor' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="visitor" class="hidden"  />
            Visitor
        </label>
        <!-- <span class="tab">Or</span> -->
        <label :class="`tab flex-auto ${ selection === 'developer' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="developer" class="hidden"  />
            Developer
        </label>
    </div>

    <template v-if="selection === 'developer'">
        <div class="flex justify-center w-full py-2 gap-2">
            <a href="#item1" class="btn btn-xs">1</a> 
            <a href="#item2" class="btn btn-xs">2</a> 
            <a href="#item3" class="btn btn-xs">3</a> 
            <a href="#item4" class="btn btn-xs">4</a>
        </div>
        <div class="carousel w-full">
            <div id="item1" class="carousel-item w-full h-96 items-center justify-center flex flex-col space-y-6">
                <!-- bi:github -->
                <Icon name="bi:github" color="gray" class="h-20 w-20"/>
                <span class="text-md font-semibold">
                    Visit the <a class="text-blue-600 ml-1" href="https://github.com/nblkmal/gerai-frontend">Open Source Repository</a> in GitHub
                </span>
            </div> 
            <div id="item2" class="carousel-item w-full h-96 items-center justify-center flex flex-col space-y-6">
                <!-- <Icon name="simple-icons:target" color="gray" class="h-20 w-20"/> -->
                <span class="text-md font-semibold">
                    Check on existing issues or create a new one
                </span>
                <div class="px-4">
                    <img class="rounded-lg w-full h-30" src="/github-issues.png" alt="">
                </div>
            </div> 
            <div id="item3" class="carousel-item w-full h-96 items-center justify-center flex flex-col space-y-6">
                <span class="text-md font-semibold">
                    Commit and pull request the issues
                </span>
                <div class="px-4">
                    <img class="rounded-lg w-full h-30" src="/github-pr.png" alt="">
                </div>
            </div> 
            <div id="item4" class="carousel-item w-full h-96 items-center justify-center flex flex-col space-y-6">
                <Icon name="mingcute:celebrate-fill" color="gray" class="h-20 w-20"/>
                <span class="text-md font-semibold">
                    Merge!
                </span>
            </div>
        </div> 
    </template>

</template>

<script>
import IconedLabel from '~/components/IconedLabel.vue'
    export default {
        components: { IconedLabel },
        data() {
            return {
                selection: 'visitor'
            }
        },

        watch: {
            selection() {
                // this.loadCamera = true
            }
        },

        methods: {
        }
    }
</script>