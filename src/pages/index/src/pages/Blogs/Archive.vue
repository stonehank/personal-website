<template>
<!--    <section>-->
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
<!--        <div id="fp-nav" class="left" style="margin-top: -43.5px; left: 280px;">-->
<!--            <ul>-->
<!--                <li v-for="(archiveData,index) in archiveList" :key="index">-->
<!--                    <a :href="'#'+archiveData.year" :class="{-->
<!--                        'active':$route.hash==='#'+archiveData.year-->
<!--                    }"><span></span>-->
<!--                    </a>-->
<!--                    <div class="fp-tooltip left">{{archiveData.year}}</div>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
<!--    </section>-->
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
                    $('#fp-nav').css({
                        left: 280
                    })
                },
                afterLoad(_, which) {
                    let idx = which - 1
                    let newStartList = Array(self.archiveList.length).fill(false)
                    newStartList[idx] = true
                    self.startList = newStartList
                }
            })
        },
        destroyed() {
            if ($.fn.fullpage) {
                $.fn.fullpage.destroy(true)
            }
        }
    }
</script>

<style scoped>

</style>
