<template>
    <v-card
            class="mx-auto"
    >
        <v-img :src="articleHeader.img" height="200px"></v-img>

        <v-card-title class="pt-2 pb-1 text-lg">
            <router-link :to="'/blogs/'+articleHeader.slug">{{articleHeader.title}}</router-link>
        </v-card-title>

        <v-card-text>
            <p class="text-secondary text-mid">{{articleHeader.description}}</p>
            <ArticleTags />
            <div class="text-sm d-flex justify-space-between">
                <CommentCount :commentCount="commentCount" />
                <DateRender :date="articleHeader.date" />
            </div>
        </v-card-text>

    </v-card>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import CommentCount from "pagesDir/index/src/commons/CommentCount";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    export default {
        name: "BlogCard",
        components: {DateRender, CommentCount, ArticleTags},
        props:{
            articleHeader:{
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
