<template>
    <v-card
            class="mx-auto h-100 d-flex flex-column"
            :to="'/articles/'+articleHeader.slug"
    >
        <v-card-title class="pt-2 pb-1 text-break">
            <h3 class="text-lg">{{articleHeader.title}}</h3>
        </v-card-title>

        <v-card-text class="d-flex flex-column justify-space-between flex-grow-1">
            <div class="text-secondary text-mid overflow-hidden" v-html="articleHeader.summary"></div>
            <div class="mt-2">
                <ArticleTags :tags="articleHeader.relatedTags"/>
                <div class="text-sm d-flex justify-space-between mt-2">
                    <CommentCount :commentCount="commentCount" />
                    <DateRender :date="articleHeader.created_at" />
                </div>
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
