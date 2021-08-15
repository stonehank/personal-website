<template>
    <section id="tags-render-wrapper">
        <v-skeleton-loader
                v-if="tagsCountRenderList==null"
                type="article,image,list-item-two-line"
        ></v-skeleton-loader>
        <div class="d-flex justify-center align-center position-relative" v-else>
            <div
                    v-for="(tagData,index) in tagsCountRenderList"
                    :key="index"
                    class="position-absolute pa-1 pa-sm-3"
                    :style="{
                    top:tagData.y +'px',
                    left:tagData.x+'px',
                    width:tagData.w+'px',
                    height:tagData.h+'px'
                }"
            >
                <v-fade-transition >
                    <v-chip
                            :color="labelColor[tagData.label]"
                            v-if="show[index]"
                            label
                            tag="div"
                            :to="'/labels/'+tagData.label"
                            class="w-100 h-100 text-center justify-center"
                            :style="'font-size:'+tagData.fontSize+'px'"
                            text-color="white"
                    >
                        {{tagData.label}}
                    </v-chip>
                </v-fade-transition>
            </div>
        </div>
    </section>
</template>

<script>
    import {getTagsCount} from "pagesDir/index/src/utils/list-json-controller";
    import TagsGenerator from "pagesDir/index/src/utils/TagsGenerator";
    import labelColor from "pagesDir/index/src/utils/label-color";

    export default {
        name: "Tags",
        computed:{
            labelColor:()=>labelColor
        },
        data(){
            return {
                tagsCountList:getTagsCount(),
                tagGenerator:null,
                tagsCountRenderList:null,
                show:[],
                timer:null
            }
        },
        mounted(){
            // $(window).on('resize',this.onResize)
            this.onResize()
            setTimeout(()=>{
                this.loopShow(0)
            },100)
        },
        destroyed(){
            // $(window).off('resize',this.onResize)
        },
        methods:{
            loopShow(idx){
                if(idx===this.tagsCountRenderList.length)return
                this.timer=setTimeout(()=>{
                    this.show[idx]=true
                    this.show=this.show.slice()
                    this.loopShow(idx+1)
                },30)
            },
            onResize(){
                this.tagsCountRenderList=null
                let gap=this.$vuetify.breakpoint.xsOnly ? 4 : 14
                // console.log($('#tags-render-wrapper'))
                let containerW=Math.min(window.innerWidth,$('#tags-render-wrapper').width())
                let containerH=window.innerHeight * 0.8
                let limit=this.$vuetify.breakpoint.xsOnly ? 5 : 2
                let shrink=this.$vuetify.breakpoint.xsOnly
                if(this.tagGenerator){
                    this.tagGenerator.update({
                        containerW, containerH,  gap,shrink,limit
                    })
                }else{
                    this.tagGenerator=new TagsGenerator(this.tagsCountList,{
                        containerW, containerH,  gap,shrink,limit
                    })
                }
                this.tagsCountRenderList=this.tagGenerator.output().sort((a,b)=>b.orderIdx-a.orderIdx)
            }
        }
    }
</script>

<style scoped>

</style>
