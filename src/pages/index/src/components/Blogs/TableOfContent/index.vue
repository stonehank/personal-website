<template>
    <v-navigation-drawer
            permanent
            fixed
            class="pa-4"
            :style="{
                    top: $custom_data.getNavH() + 'px',
                    left:0,
                }"
    >
        <v-card-subtitle class="text-lg">文章目录</v-card-subtitle>
        <v-divider></v-divider>
        <span v-if="!curToc || curToc.length===0" class="pl-4 text-muted text-lg">暂无</span>
        <TocList v-else :curLevelToc="curToc"  />
    </v-navigation-drawer>
</template>

<script>
    import TocList from "pagesDir/index/src/components/Blogs/TableOfContent/TocList";
    export default {
        name: "TableOfContent",
        components: {TocList},
        props:{
            toc:Array
        },
        data(){
            return {
                // toc: [
                //     {level:1, text:'H1 Title', anchor:'H1 Title'},
                //     {level:2, text:'H2 Title', anchor:'H2 Title'},
                //     {level:3, text:'H3 Title', anchor:'H3 Title'},
                //     {level:3, text:'H3 Title', anchor:'H3 Title'},
                //     {level:2, text:'H2 Title', anchor:'H3 Title'},
                //     {level:3, text:'H3 Title', anchor:'H3 Title'},
                //     {level:4, text:'H4 Title', anchor:'H3 Title'},
                //     {level:5, text:'H5 Title', anchor:'H3 Title'},
                //     {level:6, text:'H6 Title', anchor:'H3 Title'},
                //     {level:6, text:'H6 Title', anchor:'H3 Title'},
                //     {level:5, text:'H5 Title', anchor:'H3 Title'},
                //     {level:4, text:'H4 Title', anchor:'H3 Title'},
                //     {level:2, text:'H2 Title', anchor:'H3 Title'},
                //     {level:3, text:'H3 Title', anchor:'H3 Title'},
                //     {level:3, text:'H3 Title', anchor:'H3 Title'},
                //     {level:2, text:'H2 Title', anchor:'H3 Title'},
                //     {level:5, text:'H5 Title', anchor:'H3 Title'},
                //     {level:5, text:'H5 Title', anchor:'H3 Title'},
                // ],
                curToc:null
            }
        },
        mounted(){
            this.curToc=this.parseTocNest(this.toc)
        },
        methods:{
            parseTocNest(toc){
                if(toc.length===0)return []
                let arr=[toc[0]]
                let lastObj=arr[0]
                for(let i=1;i<toc.length;i++){
                    let tocData=toc[i]
                    if(tocData.level<=lastObj.level){
                        let parent=lastObj.parent
                        while(parent && parent.level>=tocData.level){
                            parent=parent.parent
                        }
                        if(parent==null){
                            arr.push(tocData)
                        }else{
                            tocData.parent=parent
                            parent.children.push(tocData)
                        }
                    }else{
                        if(!lastObj.children){
                            lastObj.children=[]
                        }
                        tocData.parent=lastObj
                        lastObj.children.push(tocData)
                    }
                    lastObj=tocData
                }
                return arr
            }
        }
    }
</script>

<style scoped>

</style>
