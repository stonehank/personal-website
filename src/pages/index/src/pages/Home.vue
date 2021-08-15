<template>
    <div id="fullpage-landingPage" :style="{
        marginTop:- $custom_data.getNavH() + 'px'
    }" >
        <section class="section">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h2 :class="isMobile ? 'text-xl' : 'display-2'">最新随笔文章</h2>
                    </v-col>
                    <v-row v-if="latestBlogList==null">
                        <v-col cols="12" md="4" >
                            <v-skeleton-loader
                                    type="article,image"
                            ></v-skeleton-loader>
                        </v-col>
                        <v-col cols="12" md="4" >
                            <v-skeleton-loader
                                    type="article,image"
                            ></v-skeleton-loader>
                        </v-col>
                        <v-col cols="12" md="4" >
                            <v-skeleton-loader
                                    type="article,image"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                    <v-col v-else
                           cols="12" md="4"
                           v-for="blogData in latestBlogList"
                           :key="blogData.uuid"
                    >
                        <ArticleCard
                                flat
                                class="overflow-hidden"
                                style="background:var(--foreground-color);"
                                :style="$vuetify.breakpoint.smAndDown ? 'max-height:25vh' : ''"
                                :articleHeader="blogData"
                                :comment-count="12"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <section class="section">
            <v-container class="section">
                <v-row>
                    <v-col cols="12">
                        <h2 :class="isMobile ? 'text-xl' : 'display-2'">算法思路分享</h2>
                    </v-col>
                    <v-col cols="12">
                        <v-skeleton-loader
                                v-if="latestAlgorithmList==null"
                                type="table"
                        ></v-skeleton-loader>
                        <AlgorithmTable
                                v-else
                                :items="isMobile ? latestAlgorithmList.slice(0,3) : latestAlgorithmList"
                                :disable-pagination="true"
                                :disable-sort="true"
                                hide-default-footer

                        />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
    import 'fullpage.js'
    import 'fullpage.js/dist/jquery.fullpage.css'
    import {ValinePanel} from "../utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    import ArticleCard from "pagesDir/index/src/components/Articles/ArticleCard";
    import { getDemo} from "pagesDir/index/src/utils/list-json-controller";
    import AlgorithmTable from "pagesDir/index/src/components/AlgorithmTable";
    export default {
        name: "Home",
        components:{
            AlgorithmTable,
            ArticleCard,
            ValinePanel:applyReactInVue(ValinePanel),
        },
        computed:{
            isMobile(){
                return this.$vuetify.breakpoint.smAndDown
            }
        },
        data(){
            return {
                options: {
                    // sectionsColor : ['var(--theme-primary)', 'var(--theme-secondary)'],
                    // paddingTop:this.$custom_data.getNavH() + 'px',
                    dragAndMove: 'fingersonly',
                },
                startList: [false, false, false],
                latestBlogList:null,
                latestAlgorithmList:null
            }
        },
        mounted() {
            let self = this
            if ($.fn.fullpage && $.fn.fullpage.destroy) {
                $.fn.fullpage.destroy(true)
            }
            $('#fullpage-landingPage').fullpage({
                ...this.options,
                afterLoad(_, which) {
                    let idx = which - 1
                    if(idx===0){
                        if(self.latestBlogList==null){
                            setTimeout(()=>{
                                self.latestBlogList=getDemo('blog',3)
                            },200)
                        }
                    }else if(idx===1){
                        if(self.latestAlgorithmList==null){
                            setTimeout(()=>{
                                self.latestAlgorithmList=getDemo('algorithm',6)
                            },200)
                        }
                    }
                }
            })
            setTimeout(()=>{
                this.latestBlogList=getDemo('blog',3)
            },200)

        },
        destroyed() {
            if ($.fn.fullpage) {
                $.fn.fullpage.destroy(true)
            }
        },
    }
</script>

<style scoped>

</style>
