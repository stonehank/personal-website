<template>
    <v-skeleton-loader
            v-if="algorithmList==null"
            type="table"
    ></v-skeleton-loader>
    <section v-else>
       <AlgorithmTable :items="algorithmList" />
    </section>
</template>

<script>
    import algorithmJson from 'assetsDir/doc/leetcode/.leetcode-list.json'
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import DifficultRender from "pagesDir/index/src/commons/DifficultRender";
    import AlgorithmTable from "pagesDir/index/src/components/AlgorithmTable";
    export default {
        name: "Algorithm",
        components: {AlgorithmTable, DifficultRender, ArticleTags},
        mounted(){
            let arr=[]
            for(let k in algorithmJson){
                if(algorithmJson[k].hasThinking)arr.push(algorithmJson[k])
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
            }
        }
    }
</script>

<style scoped>

</style>
