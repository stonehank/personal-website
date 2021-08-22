<template>
    <div id="fullpage-archive" :style="{
        marginTop:-$state.getNavH() + 'px'
    }">
        <div class="section"
             :data-anchor="archiveData.year"
             v-for="(archiveData,index) in archiveList"
             :key="index">
            <YearArchive
                    :archiveData="archiveData"
                    :start="startList[index]"
            />
        </div>
    </div>
</template>

<script>
    import 'fullpage.js'
    import 'fullpage.js/dist/jquery.fullpage.css'
    import YearArchive from "pagesDir/index/src/components/YearArchive/index.vue";
    import {getAllYearsInfo} from "pagesDir/index/src/utils/list-json-controller";

    export default {
        name: "Archive",
        components: {YearArchive},
        data() {
            return {
                options: {
                    paddingTop:this.$state.getNavH() + 'px',
                    dragAndMove: 'fingersonly',
                    navigation: true,
                    navigationPosition: 'left',
                    navigationTooltips: getAllYearsInfo().map(obj => obj.year)
                },
                archiveList: getAllYearsInfo(),
                startList: [false, false, false],
                timer:null
            }
        },
        mounted() {
            let self = this
            if ($.fn.fullpage && $.fn.fullpage.destroy) {
                $.fn.fullpage.destroy(true)
            }
            $('#fullpage-archive').fullpage({
                ...this.options,
                afterRender() {
                    self.updateFpNavPos('immediate')
                },
                afterLoad(_, which) {
                    let idx = which - 1
                    let newStartList = Array(self.archiveList.length).fill(false)
                    newStartList[idx] = true
                    self.startList = newStartList
                }
            })
            $(window).on('resize',this.updateFpNavPos)
        },
        destroyed() {
            clearTimeout(this.timer)
            $(window).off('resize',this.updateFpNavPos)
            if ($.fn.fullpage) {
                $.fn.fullpage.destroy(true)
            }
        },
        methods:{
            updateFpNavPos(type=''){
                this.timer=setTimeout(()=>{
                    $('#fp-nav').css({
                        left: this.$vuetify.breakpoint.mdAndUp ? 280 : 0
                    })
                },type==='immediate' ? 0 : 200)
            }
        }
    }
</script>

<style scoped>

</style>
