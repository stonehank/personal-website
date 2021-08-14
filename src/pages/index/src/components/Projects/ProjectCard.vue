<template>
    <v-card
            class="mx-auto"
    >
        <v-img :src="projectHeader.img" height="200px"></v-img>
        <v-card-title class="pt-2 pb-1 text-lg">
            <router-link :to="'/blogs/'+projectHeader.slug">{{projectHeader.title}}</router-link>
        </v-card-title>
        <v-card-text>
            <p class="text-secondary text-xs">{{projectHeader.description}}</p>
        </v-card-text>
    </v-card>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import CommentCount from "pagesDir/index/src/commons/CommentCount";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    export default {
        name: "ProjectCard",
        components: {DateRender, CommentCount, ArticleTags},
        props:{
            projectHeader:{
                default:()=>({
                        title:String,
                        img:{
                            type:String,
                            default:'https://picsum.photos/500'
                        },
                        description:String,
                        date:String,
                        tags:Array,
                    })
            },
            commentCount:Number,
        }
    }
</script>

<style scoped>

</style>
