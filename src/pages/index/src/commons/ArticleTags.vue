<template>
    <div>
        <v-chip
                v-for="(tag,idx) in tags"
                :key="idx"
                class="mr-1 mb-1"
                label
                small
                :color="labelColor[tag]"
                text-color="white"
                :to="'/labels/'+tag"
        >
            {{tag}}
        </v-chip>
    </div>
</template>

<script>
    import labelColor from "pagesDir/index/src/utils/label-color";

    export default {
        name: "ArticleTags",
        props:{
            tags:Array,
        },
        computed:{
            labelColor:()=>labelColor
        }
    }
</script>

<style scoped>

</style>
