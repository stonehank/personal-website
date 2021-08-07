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
            >
                {{item.text}}
            </v-btn>
            <TocList v-if="item.children" :curLevelToc="item.children"/>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "TocList",
        props:{
            curLevelToc:Array
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
        methods:{
            scrollTo(hash) {
                if($(hash).length===0)return
                let top=Math.max(0.001,$(hash).offset().top - this.$custom_data.getNavH() - 8)
                try {
                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    })
                } catch (_) {
                    (document.documentElement || document.body).scrollTop=0
                }
            }
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
