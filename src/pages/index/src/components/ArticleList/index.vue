<template>
    <section>
        <ListController v-if="selectedInfo"
                        v-model="selectedInfo"
                        :allLength="articleList.length"
                        :perPage="perPage"
        />
        <v-divider class="mt-4" />
        <vue2-scrollbar
                v-if="filterArticleList"
                ref="Scrollbar"
                :style="{
                    maxHeight: winH - 48 - $custom_data.getNavH() - 28 - 20 + 'px'
                }"
        >
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
        </vue2-scrollbar>
    </section>
</template>

<script>
    import Vue2Scrollbar from 'vue2-scrollbar'
    require('vue2-scrollbar/dist/style/vue2-scrollbar.css')
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    import ArticleCard from "pagesDir/index/src/components/Articles/ArticleCard";
    import ListController from "pagesDir/index/src/commons/ListController/index";
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
                    if(order && type){
                        this.articleList=this.sortBy(this.articleList,order,type)
                    }
                    if(page!==this.realPage){
                        this.realPage=page
                        if(this.$refs.Scrollbar) {
                            this.$refs.Scrollbar.scrollToY(0)
                        }
                    }else{
                        this.$nextTick(function(){
                            this.$refs.Scrollbar.scrollToY(Math.min(this.$refs.Scrollbar.top, this.$refs.listGroup.$el.offsetHeight - 600))
                        })
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
        data(){
            return {
                winH:window.innerHeight,
                articleList:this.list,
                filterArticleList:null,
                perPage:5,
                selectedInfo:null,
                realPage:null,
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
