<template>
    <p v-if="items.length===0" class="display-1 mt-4 text-secondary">无数据</p>
    <v-data-table
            v-else
            :headers="headers"
            :items="items"
    >
        <template v-slot:item.title="{ item }">
            <router-link :to="getItemPath(item)" >{{item.title}}</router-link>
        </template>
        <template v-slot:item.relatedTags="{ value }">
            <ArticleTags :tags="value" />
        </template>
        <template v-slot:item.careted_at="{ value }">
                <span>
                    {{dateFormat(value,'yyyy-mm-dd')}}
                </span>
        </template>
    </v-data-table>
</template>

<script>
    import {dateFormat} from "pagesDir/index/src/utils/date/date-format";
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    export default {
        name: "ArticleTableList",
        components: {ArticleTags},
        computed:{
            dateFormat:()=>dateFormat
        },
        props:{
            headers:Array,
            items:Array,
        },
        methods:{
            getItemPath(item){
                let pathname=''
                switch (item.flag) {
                    case '随笔':
                    case '源码阅读':
                        pathname='/articles'
                        break;
                    case '算法':
                        pathname='/algorithm'
                        break;
                    default:
                        break;
                }
                return `${pathname}/${item.slug}`
            }
        }
    }
</script>

<style scoped>

</style>
