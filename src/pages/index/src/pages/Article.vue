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
            console.log('in article')
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

        }
    }
</script>

<style scoped>

</style>
