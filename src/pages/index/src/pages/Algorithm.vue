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
    import AutoMeta from "pagesDir/index/src/utils/AutoMeta";
    import cloneDeep from 'clone-deep'
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
        watch:{
            '$route.params.slug':{
                immediate:true,
                handler(slug){
                    this.loading=true
                    if(!slug){
                        this.loading=false
                        this.fetchError=true
                    }
                    import('assetsDir/doc/leetcode/'+slug+'.json')
                    .then((module)=>{
                        this.articleDetails=cloneDeep(module.default)
                    })
                    .then(()=>{
                        AutoMeta(this.$route,{},{
                            "title": '算法思路-'+this.articleDetails.title,
                            "og_title": '算法思路-'+this.articleDetails.title,
                            "keywords": this.articleDetails.relatedTags.join(','),
                            "og_url": window.wmpConfig.domain + this.$route.path,
                            "description": this.articleDetails.title,
                            "og_description": this.articleDetails.title,
                            "og_image": null
                        })
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
