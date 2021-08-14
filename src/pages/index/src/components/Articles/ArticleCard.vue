<template>
    <v-card
            class="mx-auto h-100 d-flex flex-column"
            v-bind="$attrs"
    >
        <v-card-title class="pt-2 pb-1 text-break">
            <router-link :to="'/articles/'+articleHeader.slug">
                <h3 class="text-lg">{{articleHeader.title}}</h3>
            </router-link>
        </v-card-title>

        <v-card-text class="d-flex flex-column justify-space-start flex-grow-1">
            <div>
                <ArticleTags :tags="articleHeader.relatedTags"/>
                <div class="text-sm d-flex justify-space-start mt-2">
                    <DateRender :date="articleHeader.created_at" />
                    <b class="text-md mx-2">·</b>
                    <CommentCount :commentCount="15" />
                </div>
            </div>
            <div class="text-secondary text-xs summary-body" v-html="articleHeader.summary"></div>
        </v-card-text>

    </v-card>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import CommentCount from "pagesDir/index/src/commons/CommentCount";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    export default {
        name: "ArticleCard",
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
