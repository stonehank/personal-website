<template>
    <HomepageLoading v-if="pageLoading"></HomepageLoading>
    <div v-else>
        <section :style="{marginTop:- $state.getNavH() + 'px'}" >
            <HomeOverview :run="run" />
        </section>
        <section style="height:100vh;" v-intersect="{
            options:{threshold: 0.5},
            handler:onIntersect
        }">
            <v-container v-if="renderMore">
                <v-row>
                    <v-col cols="12"   :style="{marginTop:$state.getNavH() + 'px'}">
                        <h2>评论区</h2>
                    </v-col>
                    <v-col cols="12" >
                        <CommentSysPanel uniq-str="home-page" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
    import HomeOverview from "pagesDir/index/src/components/HomeOverview";
    import HomepageLoading from "pagesDir/index/src/components/HomepageLoading";
    export default {
        name: "Home",
        components:{
            HomepageLoading,
            CommentSysPanel:()=>import(/* webpackChunkName: "comment" */ "pagesDir/index/src/commons/CommentSystem/CommentSysPanel"),
            HomeOverview,
        },
        data(){
            return {
                pageLoading:true,
                renderMore:false,
                run:false,
                options: {
                    paddingTop:this.$state.getNavH() + 'px',
                },
                startList: [false, false, false],
                latestBlogList:null,
                latestAlgorithmList:null,
                timer:null,
            }
        },
        mounted() {
            $(document).ready(()=>{
                this.timer=setTimeout(()=>{
                    this.run=true
                    this.pageLoading=false
                },1000)
            })
        },
        destroyed() {
            clearTimeout(this.timer)
        },
        methods:{
            onIntersect(_,__,isIntersect){
                if(isIntersect){
                    this.renderMore=true
                }
            }
        }
    }
</script>

<style scoped>

</style>
