<template>
    <v-data-table
            :loading="items==null"
            :headers="headers"
            :items="items"
            v-bind="$attrs"
            v-on="$listeners"
    >
        <template v-slot:item.title="{ item }">
            <router-link :to="'/algorithm/'+item.slug" >{{item.title}}</router-link>
        </template>
        <template v-slot:item.difficultNum="{ value }">
            <DifficultRender :difficult="value" />
        </template>
        <template v-slot:item.hasThinking="{ value }">
                <span :class="{
                    'text-success':value
                }">
                    {{value ? '有' : '暂无'}}
                </span>
        </template>
        <template v-slot:item.relatedTags="{ value }">
            <ArticleTags :tags="value" />
        </template>
    </v-data-table>
</template>

<script>
    import DifficultRender from "pagesDir/index/src/commons/DifficultRender";
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    export default {
        name: "AlgorithmTable",
        components: {ArticleTags, DifficultRender},
        props:{
            items:Array,
        },
        data(){
            return {
                headers: [
                    { text: '题目', align: 'start', value: 'title',},
                    { text: '难度', align: 'center', value: 'difficultNum' },
                    {
                        text: '话题',
                        align: 'start',
                        value: 'relatedTags',
                        sort:function(a,b){
                            return a.length-b.length
                        }
                    },
                    { text: '思路说明', align: 'center', value: 'hasThinking' },
                ],
            }
        }
    }
</script>

<style scoped>

</style>
