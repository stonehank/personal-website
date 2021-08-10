<template>
    <section>
        <ListController v-model="selectedInfo" v-if="selectedInfo" />
        <v-list>
            <v-list-item-group
                    multiple
            >
                <template v-for="(item, index) in articleList">
                    <ArticleCard
                            :articleHeader="item"
                            :comment-count="12"
                            flat
                    />
                    <v-divider
                            v-if="index < articleList.length - 1"
                            :key="index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </section>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    import ArticleCard from "pagesDir/index/src/components/Articles/ArticleCard";
    import ListController from "pagesDir/index/src/commons/ListController/index";
    export default {
        name: "ArticleList",
        components: {ListController, ArticleCard, DateRender, ArticleTags},
        props:{
            list:Array,
        },
        watch:{
            selectedInfo:{
                deep:true,
                handler(newV){
                    console.log('change')
                    let order=newV.order, type=newV.type
                    if(!order || !type)return
                    this.articleList=this.sortBy(this.articleList,order,type)
                }
            }
        },
        created(){
            this.selectedInfo={
                order:'created_at',
                type:'desc'
            }
        },
        data(){
            return {
                articleList:this.list,
                selectedInfo:null
            }
        },
        methods:{
            sortBy(arr,order,type){
                let res= type==='asc' ? -1 : 1
                return arr.sort((a,b)=>{
                    return a[order] === b[order]
                        ? 0
                        : a[order] < b[order]
                            ? res
                            : -res
                })
            }
        }
    }
</script>

<style scoped>

</style>
