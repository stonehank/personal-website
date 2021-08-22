<template>
        <section class="d-flex">
            <TableOfContent  v-if="$vuetify.breakpoint.mdAndUp"
                             :toc="articleDetails.toc"
            />
            <v-container
                    tag="article"
                    id="article-content"
                    :style=" $vuetify.breakpoint.mdAndUp ? 'margin-left:256px' : ''"
            >
                <v-card flat>
                    <v-card-title class="mb-2">
                        <h1 class="text-lg">{{articleDetails.title}}</h1>
                    </v-card-title>
                    <v-card-subtitle>
                        <ArticleTags :tags="articleDetails.relatedTags" />
                        <div class="text-sm d-flex justify-space-between mt-2">
                            <div class="d-flex align-center">
                                <DateRender :date="articleDetails.created_at" />
                                <b class="text-md mx-2">·</b>
                                <CommentCount>
                                    <CommentSysCounter :uniq-str="'article-'+articleDetails.sha" />
                                </CommentCount>
                            </div>
                        </div>
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="text-primary markdown-body" v-html="articleDetails.content"></div>
                    </v-card-text>
                </v-card>
                <v-divider class="my-4" />
                <CommentSysPanel :uniq-str="'article-'+articleDetails.sha" />
            </v-container>
        </section>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import CommentCount from "pagesDir/index/src/commons/CommentCount";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    import TableOfContent from "pagesDir/index/src/components/Articles/TableOfContent";
    import CommentSysCounter from "pagesDir/index/src/commons/CommentSystem/CommentSysCounter";
    import CommentSysPanel from "pagesDir/index/src/commons/CommentSystem/CommentSysPanel";
    export default {
        name: "ArticleInfo",
        props:{
            articleDetails:{
                default:()=>({}),
                type:Object
            },
        },
        components: {
            CommentSysPanel,
            CommentSysCounter,
            TableOfContent, DateRender, CommentCount, ArticleTags},
        watch:{
            articleDetails: {
                handler(){
                    this.updateTocIdList()
                    // console.log('watch slug nest',this.tocIdList)
                }
            }
        },
        data(){
            return {
                tocIdList:Array(this.articleDetails.toc.length).fill('')
            }
        },
        mounted(){
            this.updateTocIdList()
            $(window).on('scroll',this.updateOnScroll)
        },
        destroyed() {
            $(window).off('scroll',this.updateOnScroll)
        },
        methods:{
            updateTocIdList(){
                this.tocIdList=Array(this.articleDetails.toc.length).fill('')
                if(this.tocIdList.length===0)return
                this.articleDetails.toc.forEach((obj,i)=>{
                    this.tocIdList[i]='#'+obj.anchor
                })
            },
            updateOnScroll(){
                let curScrTop=Math.floor($('html')[0].scrollTop)
                let navH=this.$state.getNavH()
                for(let i=this.tocIdList.length-1;i>=0;i--){
                    let curIdHash=this.tocIdList[i]
                    console.log(curIdHash)
                    if(curScrTop + navH + 16 > $(curIdHash).offset().top){
                        if(this.$route.hash!==curIdHash){
                            this.$router.replace({hash:curIdHash})
                        }
                        break
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
