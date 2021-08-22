<template>
        <section class="d-flex">
            <v-container
                    tag="article"
                    id="algorithm-content"
            >
                <v-card flat>
                    <v-card-title class="mb-2">
                        <h1 class="text-lg">{{articleDetails.title}}</h1>
                    </v-card-title>
                    <v-card-subtitle>
                        <ArticleTags :tags="articleDetails.relatedTags"/>
                        <div class="text-sm d-flex justify-space-between mt-2">
                            <div class="d-flex align-center">
                                <DifficultRender :difficult="articleDetails.difficult"/>
                                <b class="text-md mx-2">·</b>
                                <CommentCount>
                                    <CommentSysCounter :uniq-str="'algorithm-'+articleDetails.sha"/>
                                </CommentCount>
                            </div>
                        </div>
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="text-primary markdown-body mb-2" v-html="articleDetails.content"></div>
                        <div v-if="articleDetails.thinking" class="text-primary markdown-body mb-2"
                             v-html="articleDetails.thinking"></div>
                        <div v-for="(code,index) in articleDetails.code"
                             :key="index"
                             class="text-primary markdown-body"
                             v-html="code">

                        </div>
                    </v-card-text>
                </v-card>
                <v-divider class="my-4"/>
                <CommentSysPanel :uniq-str="'algorithm-'+articleDetails.sha"/>
            </v-container>
        </section>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import CommentCount from "pagesDir/index/src/commons/CommentCount";
    import DifficultRender from "pagesDir/index/src/commons/DifficultRender";
    import CommentSysCounter from "pagesDir/index/src/commons/CommentSystem/CommentSysCounter";
    import CommentSysPanel from "pagesDir/index/src/commons/CommentSystem/CommentSysPanel";

    export default {
        name: "AlgorithmInfo",
        props: {
            articleDetails: {
                default: () => ({}),
                type: Object
            },
        },
        components: {
            CommentSysPanel,
            CommentSysCounter,
            DifficultRender, CommentCount, ArticleTags
        },
    }
</script>

<style scoped>

</style>
