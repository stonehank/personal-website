<template>
    <v-container >
        <v-row>
            <v-col cols="12">
                <h2>最新博客</h2>
            </v-col>
            <v-col cols="12" md="4" v-for="blogData in latestBlogList" :key="blogData.uuid">
                <BlogCard
                        :articleHeader="blogData"
                        :comment-count="12"
                />
            </v-col>
            <v-col cols="12">
                <h2>个人项目</h2>
            </v-col>
            <v-col cols="12" md="4">

            </v-col>
            <v-col cols="12">
<!--                <ValinePanel  />-->
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import {ValinePanel} from "../utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    import BlogCard from "pagesDir/index/src/components/Blogs/BlogCard";
    import blogListJson from 'assetsDir/doc/blog/.blog-list.json'
    export default {
        name: "Home",
        components:{
            BlogCard,
            ValinePanel:applyReactInVue(ValinePanel),
        },
        computed:{
            latestBlogList:function(){
                let arr=[]
                for(let k in blogListJson){
                    arr.push(blogListJson[k])
                }
                return arr.sort((a,b)=>a.created_at <= b.created_at ? 1 : -1).slice(0,10)
            }
        },
        data(){
            return {
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>
