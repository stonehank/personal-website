<template>
    <div id="fullpage-archive">
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
    import 'wow.js/css/libs/animate.css'
    import YearArchive from "pagesDir/index/src/components/YearArchive/index.vue";
    import {getAllYearsInfo} from "pagesDir/index/src/utils/list-json-controller";

    export default {
        name: "Archive",
        components: {YearArchive},
        data() {
            return {
                options: {
                    dragAndMove: 'fingersonly',
                    navigation: true,
                    navigationPosition: 'left',
                    navigationTooltips: getAllYearsInfo().map(obj => obj.year)
                },
                archiveList: getAllYearsInfo(),
                startList: [false, false, false]
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
                    self.updateFpNavPos()
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
            $(window).off('resize',this.updateFpNavPos)
            if ($.fn.fullpage) {
                $.fn.fullpage.destroy(true)
            }
        },
        methods:{
            updateFpNavPos(){
                $('#fp-nav').css({
                    left: this.$vuetify.breakpoint.mdAndUp ? 280 : 0
                })
            }
        }
    }
</script>

<style scoped>

</style>
