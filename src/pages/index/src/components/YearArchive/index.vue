<template>
    <section class="d-flex justify-start align-center timeline-wrapper" :style="`height:${wrapperH}px`">
        <div class="timeline-left" v-if="$vuetify.breakpoint.mdAndUp">
            <YearInfo :archiveData="archiveData" :start="start" />
        </div>
        <div class="timeline-axis">
            <div class="timeline-dot"></div>
            <div class="timeline-line"></div>
        </div>
        <div class="timeline-right d-flex flex-column  pb-4" style="flex:1">
            <div class="w-100" v-if="$vuetify.breakpoint.smAndDown">
                <YearInfo :archiveData="archiveData" :start="start" />
            </div>
            <MonthCardInYearArchive :counts="archiveData.month_counts" :year="archiveData.year" :start="start"/>
        </div>
    </section>
</template>

<script>
    import MonthCardInYearArchive from "pagesDir/index/src/components/YearArchive/MonthCardInYearArchive";
    import AnimateGrowNumber from "pagesDir/index/src/commons/AnimateGrowNumber";
    import YearInfo from "pagesDir/index/src/components/YearArchive/YearInfo";
    export default {
        name: "YearArchive",
        components: {YearInfo, AnimateGrowNumber, MonthCardInYearArchive},
        props:{
            archiveData:Object,
            start:Boolean
        },
        data(){
            return {
                wrapperH:0
            }
        },
        created(){
            this.updateWrapperH()
        },
        mounted(){
            $(window).on('resize',this.updateWrapperH)
        },
        destroyed() {
            $(window).off('resize',this.updateWrapperH)
        },
        methods:{
            updateWrapperH(){
                this.wrapperH=window.innerHeight - this.$state.getNavH()
            }
        }
    }
</script>

<style scoped lang="scss">
    .timeline-wrapper{
        .timeline-left{
            width:350px;
            height:100%;
        }
        .timeline-right{
            height:100%
        }
        .timeline-axis{
            height:100%;
            width:42px;
            position:relative;
            .timeline-dot{
                width:24px;
                height:24px;
                background:var(--theme-primary);
                position:absolute;
                left:50%;
                top:16px;
                z-index:2;
                transform:translateX(-50%);
                border-radius: 50%;
            }
            .timeline-line{
                height:130%;
                width:2px;
                background:var(--border-color);
                position:absolute;
                left:50%;
                top:0;
                z-index:0;
                transform:translateX(-50%)
            }
        }
    }
</style>
