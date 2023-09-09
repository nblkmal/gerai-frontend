<template>
    <div class="tabs tabs-boxed flex justify-items-stretch">
        <label :class="`tab flex-auto ${ selection === 'visitor' ? 'tab-active' : '' }`">
            <input type="radio" name="selection" v-model="selection" value="visitor" class="hidden"  />
            Visitor
        </label>
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
            <div id="item1" class="carousel-item w-full h-96 items-center justify-center">
                Visit the Open Source repo
            </div> 
            <div id="item2" class="carousel-item w-full h-96 items-center justify-center">
                Check on existing issues or create a new one
            </div> 
            <div id="item3" class="carousel-item w-full h-96 items-center justify-center">
                Commit and PR the issues
            </div> 
            <div id="item4" class="carousel-item w-full h-96 items-center justify-center">
                Merge!
            </div>
        </div> 
    </template>

</template>

<script>
    export default {
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