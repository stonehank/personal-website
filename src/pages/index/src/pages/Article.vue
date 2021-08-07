<template>
    <BlogArticle v-if="articleDetails"
                 :articleDetails="articleDetails"
    />
</template>

<script>
    import BlogArticle from "pagesDir/index/src/components/Blogs/BlogArticle";
    export default {
        name: "Article",
        components: {BlogArticle},
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
        }
    }
</script>

<style scoped>

</style>
