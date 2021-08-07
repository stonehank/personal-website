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
                    <div class="text-sm d-flex justify-space-between">
                        <div class="d-flex align-center">
                            <DateRender :date="articleDetails.created_at" />
                            <b class="text-md mx-2">·</b>
                            <CommentCount :commentCount="15" />
                        </div>
                    </div>
                </v-card-subtitle>
                <v-card-text>
                    <div class="text-primary markdown-body" v-html="articleDetails.content"></div>
                </v-card-text>
            </v-card>
        </v-container>
    </section>
</template>

<script>
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    import CommentCount from "pagesDir/index/src/commons/CommentCount";
    import DateRender from "pagesDir/index/src/commons/DateRender";
    import TableOfContent from "pagesDir/index/src/components/Articles/TableOfContent";
    export default {
        name: "ArticleInfo",
        props:{
            articleDetails:{
                default:()=>({}),
                type:Object
            },
        },
        components: {TableOfContent, DateRender, CommentCount, ArticleTags},
        data(){
            return {
                tocId:Array(this.articleDetails.toc.length).fill('')
            }
        },
        mounted(){
            if(this.tocId.length===0)return
            this.articleDetails.toc.forEach((obj,i)=>{
                this.tocId[i]='#'+obj.anchor
            })
            $(window).on('scroll',this.updateOnScroll)
        },
        destroyed() {
            $(window).off('scroll',this.updateOnScroll)
        },
        methods:{
            updateOnScroll(){
                let curScrTop=Math.floor($('html')[0].scrollTop)
                let navH=this.$custom_data.getNavH()
                for(let i=this.tocId.length-1;i>=0;i--){
                    let curIdHash=this.tocId[i]
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
