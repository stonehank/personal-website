<template>
    <div>
        <section :style="{marginTop:- $state.getNavH() + 'px'}" >
            <HomeOverview :run="run" />
        </section>
        <section style="height:100vh;" v-intersect="{
            threshold: 0.5,
            handler:onIntersect
        }">
            <v-container>
                <v-row>
                    <v-col cols="12"   :style="{marginTop:$state.getNavH() + 'px'}">
                        <h2>评论区</h2>
                    </v-col>
                    <v-col cols="12" v-if="renderMore">
                        <CommentSysPanel uniq-str="home-page" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
    import HomeOverview from "pagesDir/index/src/components/HomeOverview";
    export default {
        name: "Home",
        components:{
            CommentSysPanel:()=>import("pagesDir/index/src/commons/CommentSystem/CommentSysPanel"),
            HomeOverview,
        },
        data(){
            return {
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
            this.timer=setTimeout(()=>{
                this.run=true
            },200)

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
