<template>
    <perfect-scrollbar>
        <v-list
                dense
        >
            <v-subheader class="text-lg">标签</v-subheader>
            <ArticleTags class="pl-4" :tags="labelResults" :click-event="hideSearch" />
            <v-subheader class="text-lg">内容</v-subheader>
            <v-list-item class="pl-4" v-for="(result,index) in results" @click="hideSearch" :to="result.path" :key="index">
                <v-list-item-content>
                    <v-list-item-title class="d-flex justify-space-between">
                        <p class="mb-0 ellipse">
                           <span class="text-secondary">{{result.flag}} ></span>
                            <span v-html="result.title"></span>
                        </p>
                        <span class="flex-shrink-0" v-html="result.created_at"></span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="no-gaps" style="opacity:0.75">
                        <p v-html="result.matchContent"></p>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </perfect-scrollbar>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    export default {
        name: "ResultsRender",
        components: {ArticleTags},
        props:{
            results:Array,
            labelResults:Array,
            hideSearch:Function
        },
    }
</script>

<style lang="scss">
    .no-gaps{
        * {
            padding:0 !important;
            margin:0 !important;
        }
    }
</style>
