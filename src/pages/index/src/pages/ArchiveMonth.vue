<template>
    <v-skeleton-loader
            v-if="curYearInfo==null"
            type="table"
    ></v-skeleton-loader>
    <section v-else>
        <v-navigation-drawer
                v-if="$vuetify.breakpoint.mdAndUp"
                permanent
                width="320"
                fixed
                class="pa-4"
                :style="{
                    top: $custom_data.getNavH() + 'px',
                    left:0,
                }"
        >
            <YearInfo
                    :archive-data="curYearInfo"
                    :animate="false"
            />
        </v-navigation-drawer>
        <v-container style="margin-left:320px;">
            <v-select
                    filled
                    :items="Array(12).fill(0).map((_,idx)=>({
                        text: (idx+1) + '月份 ('+ curYearInfo.month_counts[idx] +')',
                        value: String(idx+1)
                    }))"
                    dense
                    hide-details
                    style="max-width:150px"
                    v-model="selectedMonth"
                    @change="onChange"
            ></v-select>
            <p v-if="curYearMonthList.length===0" class="display-1 mt-4 text-secondary">无数据</p>
            <v-data-table
                    v-else
                    :headers="headers"
                    :items="curYearMonthList"
            >
                <template v-slot:item.title="{ item }">
                    <router-link :to="getItemPath(item)" >{{item.title}}</router-link>
                </template>
                <template v-slot:item.relatedTags="{ value }">
                    <ArticleTags :tags="value" />
                </template>
                <template v-slot:item.careted_at="{ value }">
                <span>
                    {{dateFormat(value,'yyyy-mm-dd')}}
                </span>
                </template>
            </v-data-table>
        </v-container>
    </section>
</template>

<script>
    import {dateFormat} from "pagesDir/index/src/utils/date/date-format";
    import YearInfo from "pagesDir/index/src/components/YearArchive/YearInfo";
    import {
        allListOnSpecificYearMonth,
        getYearInfo
    } from "pagesDir/index/src/utils/list-json-controller";
    import ArticleTags from "pagesDir/index/src/commons/ArticleTags";
    export default {
        name: "ArchiveMonth",
        components: {ArticleTags, YearInfo},
        computed:{
            dateFormat:()=>dateFormat
        },
        watch:{
            "$route.params.slug":{
                immediate:true,
                handler:function(newV,oldV){
                    if(newV!==oldV){
                        let [year,month]=newV.split('-')
                        this.curYearMonthList=allListOnSpecificYearMonth(year,month)
                        this.selectedMonth=month
                    }
                }

            }
        },
        data(){
            return {
                selectedMonth:null,
                curYearMonthList:[],
                curYearInfo: null,
                headers: [
                    { text: '标题', align: 'start', value: 'title',},
                    { text: '类型', align: 'center', value: 'flag' },
                    { text: '时间', align: 'center', value: 'created_at' },
                    {
                        text: '相关标签',
                        align: 'start',
                        value: 'relatedTags',
                        sort:function(a,b){
                            return a.length-b.length
                        }
                    },
                ],
            }
        },
        created(){
            let slug=this.$route.params.slug
            let [year]=slug.split('-')
            this.curYearInfo=getYearInfo(year)
        },
        methods:{
            onChange(selected){
                let slug=this.$route.params.slug
                let [year]=slug.split('-')
                let newSlug=`${year}-${selected}`
                if(this.$route.params.slug!==newSlug) {
                    this.$router.push(`/archive/${newSlug}`)
                }
            },
            getItemPath(item){
                let pathname=''
                switch (item.flag) {
                    case '随笔':
                    case '源码阅读':
                        pathname='/articles'
                        break;
                    case '算法':
                        pathname='/algorithm'
                        break;
                    default:
                        break;
                }
                return `${pathname}/${item.slug}`
            }
        }
    }
</script>

<style scoped>
    .year-info{
        width:300px;
        padding-right:12px;
        border-right:1px solid var(--border-color);
    }
</style>
