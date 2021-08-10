<template>
    <v-skeleton-loader
            v-if="blogList==null"
            type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleList class="pa-3" v-else :list="blogList"/>
</template>

<script>
    import blogListJson from 'assetsDir/doc/blog/.blog-list.json'
    import ArticleList from "pagesDir/index/src/components/ArticleList";
    export default {
        name: "Default",
        components: {ArticleList},
        mounted(){
            let arr=[]
            for(let k in blogListJson){
                arr.push(blogListJson[k])
            }
            this.blogList=arr
        },
        data(){
            return {
                blogList:null
            }
        }
    }
</script>

<style scoped>

</style>
