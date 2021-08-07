<template>
    <section>
        <v-list>
            <v-list-item-group
                    multiple
            >
                <template v-for="(item, index) in blogList">
                    <BlogCard  :articleHeader="item"
                               :comment-count="12"
                    />
                    <v-divider
                            v-if="index < blogList.length - 1"
                            :key="index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </section>
</template>

<script>
    import blogListJson from 'assetsDir/doc/blog/.blog-list.json'
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    import BlogCard from "pagesDir/index/src/components/Blogs/BlogCard";
    export default {
        name: "Default",
        components: {BlogCard, DateRender, ArticleTags},
        computed:{
            blogList:function(){
                let arr=[]
                for(let k in blogListJson){
                    arr.push(blogListJson[k])
                }
                return arr.sort((a,b)=>a.created_at <= b.created_at ? 1 : -1).slice(0,10)
            }
        }
    }
</script>

<style scoped>

</style>
