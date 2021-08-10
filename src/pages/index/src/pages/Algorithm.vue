<template>
    <v-skeleton-loader
            v-if="articleDetails==null"
            type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <AlgorithmInfo v-else
                   :article-details="articleDetails"
    />
</template>

<script>
    import ArticleInfo from "pagesDir/index/src/components/Articles/AlgorithmInfo";
    import AlgorithmInfo from "pagesDir/index/src/components/Articles/AlgorithmInfo";
    export default {
        name: "Algorithm",
        components: {AlgorithmInfo, ArticleInfo},
        data(){
            return {
                articleDetails:null,
                fetchError:false,
                loading:true
            }
        },
        mounted(){
            this.loading=true
            console.log('in article')
            let slug=this.$route.params.slug
            if(!slug){
                this.loading=false
                this.fetchError=true
            }
            import('assetsDir/doc/leetcode/'+slug+'.json')
            .then((module)=>{
                this.articleDetails=module.default
            })
        }
    }
</script>

<style scoped>

</style>
