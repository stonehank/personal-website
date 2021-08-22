<template>
    <v-skeleton-loader
            v-if="loading"
            type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleInfo v-else-if="!fetchError"
                 :articleDetails="articleDetails"
    />
    <Error v-else />
</template>

<script>
    import cloneDeep from 'clone-deep'
    import ArticleInfo from "pagesDir/index/src/components/Articles/ArticleInfo";
    import AutoMeta from "pagesDir/index/src/utils/AutoMeta";
    import Error from "pagesDir/index/src/components/Error";
    export default {
        name: "Article",
        components: {Error, ArticleInfo},
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
                    console.log(slug)
                    this.loading=true
                    if(!slug){
                        this.loading=false
                        this.fetchError=true
                        return
                    }
                    this.init(slug)
                    .then(()=>{
                        this.fetchError=false
                        this.loading=false
                    })
                    .catch(()=>{
                        this.loading=false
                        this.fetchError=true
                    })
                }
            }
        },
        methods:{
            init(slug){
                return import('assetsDir/doc/blog/'+slug+'.json')
                .then((module)=>{
                    this.articleDetails=cloneDeep(module.default)
                })
                .catch(err=>{
                    return import('assetsDir/doc/sourceCode/'+slug+'.json')
                    .then((module)=>{
                        this.articleDetails=cloneDeep(module.default)
                    })
                })
                .then(()=>{
                    AutoMeta(this.$route,{},{
                        "title": this.articleDetails.title,
                        "og_title": this.articleDetails.title,
                        "keywords": this.articleDetails.relatedTags ? this.articleDetails.relatedTags.join(',') : this.articleDetails.title,
                        "og_url": window.wmpConfig.domain + this.$route.path,
                        "description": this.articleDetails.title,
                        "og_description": this.articleDetails.title,
                        "og_image": null
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
