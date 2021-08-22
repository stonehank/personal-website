<template>
    <section>
        <ListController v-if="selectedInfo"
                        v-model="selectedInfo"
                        :allLength="articleList.length"
                        :perPage="perPage"
                        ref="listControllerRef"
                        class="position-fixed py-2 w-100"
                        style="background:var(--background-color);z-index: 2"
                        :style="{
                            top:$state.getNavH() + 'px',
                            left: ($vuetify.breakpoint.smAndDown ? 0 : 256 + 12) + 'px',
                        }"
        />
        <v-divider
                v-if="mounted"
                :style="{
                    marginTop:($refs.listControllerRef.$el.offsetHeight - 12) + 'px'
                }"
        />
        <v-list ref="listGroup">
            <v-list-item-group>
                <template v-for="(item, index) in filterArticleList">
                    <ArticleCard
                            :articleHeader="item"
                            :comment-count="12"
                            flat
                    />
                    <v-divider
                            v-if="index < filterArticleList.length - 1"
                            :key="index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </section>
</template>

<script>
    import Vue2Scrollbar from 'vue2-scrollbar'
    require('vue2-scrollbar/dist/style/vue2-scrollbar.css')
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    import ArticleCard from "pagesDir/index/src/components/Articles/ArticleCard";
    import ListController from "pagesDir/index/src/commons/ListController/index";
    import {scrollTo} from "pagesDir/index/src/utils";
    export default {
        name: "ArticleList",
        components: {ListController, ArticleCard, DateRender, ArticleTags,Vue2Scrollbar},
        props:{
            list:Array,
        },
        watch:{
            selectedInfo:{
                deep:true,
                handler(newV){
                    if(!newV)return
                    let order=newV.order, type=newV.type, page=newV.page
                    if(!order || !type || !page)return
                    console.log(order,type)
                    if(type && order==='created_at'){
                        this.articleList=this.sortBy(this.articleList,order,type)
                    }else if(type && order==='relatedTags'){
                        this.articleList=this.sortByLabels(this.articleList,order,type)
                    }
                    if(page!==this.realPage){
                        this.realPage=page
                        scrollTo(0,true)
                    }
                    this.filterArticleList=this.articleList.slice(this.perPage * (page - 1),this.perPage * page)
                }
            }
        },
        created(){
            this.selectedInfo={
                order:'created_at',
                type:'desc',
                page:1
            }
        },
        mounted(){
            this.mounted=true
        },
        data(){
            return {
                mounted:false,
                winH:window.innerHeight,
                articleList:this.list,
                filterArticleList:null,
                perPage:5,
                selectedInfo:null,
                realPage:null,
            }
        },
        methods:{
            sortByLabels(arr,order,type){
                let res= type==='asc' ? -1 : 1
                return arr.sort((a,b)=>{
                    if(!a[order])return res
                    else if(!b[order])return -res
                    else{
                        return a[order].length === b[order].length
                            ? 0
                            : a[order].length < b[order].length
                                ? res
                                : -res
                    }
                })
            },
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
