<template>
    <v-skeleton-loader
            v-if="articleDetails==null"
            type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleInfo v-else
                 :articleDetails="articleDetails"
    />
</template>

<script>
    import ArticleInfo from "pagesDir/index/src/components/Articles/ArticleInfo";
    import AutoMeta from "pagesDir/index/src/utils/AutoMeta";
    export default {
        name: "Article",
        components: {ArticleInfo},
        data(){
            return {
                articleDetails:null,
                fetchError:false,
                loading:true
            }
        },
        mounted(){
            this.loading=true
            let slug=this.$route.params.slug
            if(!slug){
                this.loading=false
                this.fetchError=true
            }
            import('assetsDir/doc/blog/'+slug+'.json')
            .then((module)=>{
                this.articleDetails=module.default
            })
            .catch(err=>{
                return import('assetsDir/doc/sourceCode/'+slug+'.json')
                .then((module)=>{
                    this.articleDetails=module.default
                })
            })
            .then(()=>{
                AutoMeta(this.$route,{},{
                    "title": this.articleDetails.title,
                    "og_title": this.articleDetails.title,
                    "keywords": this.articleDetails.relatedTags.join(','),
                    "og_url": window.wmpConfig.domain + this.$route.path,
                    "description": this.articleDetails.title,
                    "og_description": this.articleDetails.title,
                    "og_image": null
                })
            })

        }
    }
</script>

<style scoped>

</style>
