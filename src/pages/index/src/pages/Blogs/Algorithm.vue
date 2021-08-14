<template>
    <v-skeleton-loader
            v-if="algorithmList==null"
            type="table"
    ></v-skeleton-loader>
    <section v-else>
        <v-data-table
                :loading="algorithmList==null"
                :headers="headers"
                :items="algorithmList"
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
    </section>
</template>

<script>
    import algorithmJson from 'assetsDir/doc/leetcode/.leetcode-list.json'
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import DifficultRender from "pagesDir/index/src/commons/DifficultRender";
    export default {
        name: "Algorithm",
        components: {DifficultRender, ArticleTags},
        mounted(){
            let arr=[]
            for(let k in algorithmJson){
                arr.push(algorithmJson[k])
            }
            this.timer=setTimeout(()=>this.algorithmList=arr,200)
        },
        destroyed() {
            clearTimeout(this.timer)
        },
        data(){
            return {
                timer:null,
                algorithmList:null,
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
