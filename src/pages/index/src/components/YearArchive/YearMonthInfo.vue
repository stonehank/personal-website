<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pb-0" :class="isMobile ? 'text-center' : 'text-right'">
                <router-link :to="'/blogs/archive#'+archiveMonthData.year">
                    <h2 :class="isMobile ? 'display-2' : 'display-3'">{{archiveMonthData.year}}</h2>
                </router-link>
                <span
                        :class="isMobile ? 'text-lg' : 'text-xl'"
                        class="text-secondary"
                >
                    / {{archiveMonthData.month}} 月
                </span>
            </v-col>
            <v-col cols="12" :class="isMobile ? 'text-center' : 'text-right'">
                <p class="mb-0"
                   :class="isMobile ? 'text-md' : 'text-lg'"
                   :style="animate ? 'opacity:0;' : ''"
                   ref="year-info-1">
                    共完成
                    <AnimateGrowNumber :class="isMobile ? 'text-lg' : 'display-1'"
                                       :final-num="archiveMonthData.blog_count"
                                       :start="start"
                                       :animate="animate"
                    />
                    篇随笔
                </p>
<!--                <p class="text-secondary"-->
<!--                   :class="isMobile ? 'text-md' : 'text-lg'"-->
<!--                   :style="animate ? 'opacity:0;' : ''"-->
<!--                   ref="year-info-2"-->
<!--                >-->
<!--                    总共阅读次数-->
<!--                    <AnimateGrowNumber :class="isMobile ? 'text-lg' : 'display-1'"-->
<!--                                       :final-num="archiveMonthData.view_count"-->
<!--                                       :shrink="archiveMonthData.view_count > 99999"-->
<!--                                       :start="start"-->
<!--                                       :animate="animate"-->
<!--                    />-->
<!--                </p>-->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import anime from 'animejs'
    import AnimateGrowNumber from "pagesDir/index/src/commons/AnimateGrowNumber";
    export default {
        name: "YearMonthInfo",
        components: {AnimateGrowNumber},
        props:{
            archiveMonthData:Object,
            start:Boolean,
            animate:{
                default:true,
            }
        },
        computed:{
            isMobile(){
                return this.$vuetify.breakpoint.smAndDown
            }
        },
        watch:{
            start:{
                immediate:true,
                handler(newV){
                    if(!this.animate)return
                    if(newV){
                        anime({
                            targets:this.$refs['year-info-1'],
                            opacity:1,
                            easing:'linear',
                            duration:400,
                        })
                        anime({
                            targets:this.$refs['year-info-2'],
                            opacity:1,
                            easing:'linear',
                            duration:400,
                            delay:200
                        })
                    }else{
                        anime.remove(this.$refs['year-info-1'])
                        anime.remove(this.$refs['year-info-2'])
                        $(this.$refs['year-info-1']).css({
                            opacity:0,
                        })
                        $(this.$refs['year-info-2']).css({
                            opacity:0,
                        })
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
