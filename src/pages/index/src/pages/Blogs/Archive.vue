<template>
    <div id="fullpage-archive">
        <div class="section"
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
    import  'fullpage.js'
    import 'wow.js/css/libs/animate.css'
    import YearArchive from "pagesDir/index/src/components/YearArchive/index.vue";
    export default {
        name: "Archive",
        components: {YearArchive},
        data(){
            return {
                options: {
                    dragAndMove:'fingersonly',
                    anchors: ['page1', 'page2', 'page3'],
                    sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
                },
                archiveList:[
                    {
                        year:'2018',
                        blog_count:142,
                        view_count:1244354,
                        month_counts:Array(12).fill(0).map(_=>Math.random() * 75),
                    },
                    {
                        year:'2019',
                        blog_count:102,
                        view_count:744354,
                        month_counts:Array(12).fill(0).map(_=>Math.random() * 75),
                    },
                    {
                        year:'2020',
                        blog_count:62,
                        view_count:44354,
                        month_counts:Array(12).fill(0).map(_=>Math.random() * 75),
                    }

                ],
                startList:[false,false,false]
            }
        },
        mounted(){
            let self=this
            $('#fullpage-archive').fullpage({
                verticalCentered:false,
                afterLoad(_,which){
                    let idx=which-1
                    let newStartList=Array(self.archiveList.length).fill(false)
                    newStartList[idx]=true
                    self.startList=newStartList
                }
            })
        },
        destroyed() {
            console.log('destroyed')
            if($.fn.fullpage){
                $.fn.fullpage.destroy(true)
            }
        }
    }
</script>

<style scoped>

</style>
