<template>
    <ul>
        <li
                v-for="(item,index) in curLevelToc"
                :key="index"
        >
            <v-btn
                    class="mt-1"
                    :class="'toc-title-'+item.level"
                    small
                    text
                    replace
                    :to="'#'+decodeURI(item.anchor)"
                    @click="()=>scrollTo('#'+item.anchor)"
                    active-class="active"
                    v-html="item.text"
            >
            </v-btn>
            <TocList v-if="item.children" :curLevelToc="item.children"/>
        </li>
    </ul>
</template>

<script>
    import {scrollTo} from "pagesDir/index/src/utils";
    export default {
        name: "TocList",
        props:{
            curLevelToc:Array
        },
        computed:{
            scrollTo:()=>scrollTo
        },
        data(){
            return {
                initTimer:null,
            }
        },
        mounted(){
            $(document).ready(()=>{
                this.initTimer=setTimeout(()=>{
                    let hash=decodeURI(this.$route.hash)
                    if(hash){
                        this.scrollTo(hash)
                    }
                },0)

            })
        },
        destroyed() {
            clearTimeout(this.initTimer)
        }
    }
</script>

<style scoped lang="scss">
    ul{
        a {
            color: var(--text-secondary);

            &:hover {
                color: var(--text-primary)
            }
        }
    }
    ul > ul{
        left: 24px;
    }
    .active{
        color:var(--info-color)
    }
</style>
