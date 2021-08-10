<template>
    <v-skeleton-loader
            v-if="sourceCodeList==null"
            type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleList v-else class="pa-3" :list="sourceCodeList"/>
</template>

<script>
    import sourceCodeList from 'assetsDir/doc/sourceCode/.sourceCode-list.json'
    import ArticleList from "pagesDir/index/src/components/ArticleList";
    export default {
        name: "SourceCode",
        components: {ArticleList},
        mounted(){
            let arr=[]
            for(let k in sourceCodeList){
                arr.push(sourceCodeList[k])
            }
            this.sourceCodeList=arr
        },
        data(){
            return {
                sourceCodeList:null
            }
        }
    }
</script>

<style scoped>

</style>
