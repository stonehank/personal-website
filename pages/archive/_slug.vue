<template>
    <v-skeleton-loader
        v-if="curYearInfo == null"
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
                top: $state.getNavH() + 'px',
                left: 0,
            }"
        >
            <ArchiveMonthInfo
                :archive-month-data="curYearMonthInfo"
                :animate="false"
            />
        </v-navigation-drawer>
        <div :style="$vuetify.breakpoint.mdAndUp ? 'margin-left:320px;' : ''">
            <v-select
                v-model="selectedMonth"
                filled
                :items="
                    Array(12)
                        .fill(0)
                        .map((_, idx) => ({
                            text:
                                idx +
                                1 +
                                '月份 (' +
                                curYearInfo.month_counts[idx] +
                                ')',
                            value: String(idx + 1),
                        }))
                "
                dense
                hide-details
                style="max-width: 150px"
                @change="onChange"
            ></v-select>
            <ArticleTableList :headers="headers" :items="curYearMonthList" />
        </div>
    </section>
</template>

<script>
import {
    allListOnSpecificYearMonth,
    getYearMonthInfo,
    getYearInfo,
} from 'utils/list-json-controller'
export default {
    asyncData({ params }) {
        return { slug: params?.slug }
    },
    data() {
        return {
            selectedMonth: null,
            curYearMonthList: [],
            curYearMonthInfo: null,
            curYearInfo: null,
            headers: [
                { text: '标题', align: 'start', value: 'title' },
                { text: '类型', align: 'center', value: 'flag' },
                { text: '时间', align: 'center', value: 'created_at' },
                {
                    text: '相关标签',
                    align: 'start',
                    value: 'relatedTags',
                    sort: function (a, b) {
                        return a.length - b.length
                    },
                },
            ],
        }
    },
    watch: {
        slug: {
            immediate: true,
            handler: function (newV, oldV) {
                if (newV !== oldV) {
                    const [year, month] = newV.split('-')
                    this.curYearMonthList = allListOnSpecificYearMonth(
                        year,
                        month
                    )
                    this.selectedMonth = month
                    this.curYearMonthInfo = getYearMonthInfo(year, month)
                }
            },
        },
    },
    created() {
        const slug = this.slug
        const [year] = slug.split('-')
        this.curYearInfo = getYearInfo(year)
    },
    methods: {
        onChange(selected) {
            const slug = this.slug
            const [year] = slug.split('-')
            const newSlug = `${year}-${selected}`
            if (this.$route.params.slug !== newSlug) {
                this.$router.push(`/archive/${newSlug}`)
            }
        },
    },
}
</script>

<style scoped>
.year-info {
    width: 300px;
    padding-right: 12px;
    border-right: 1px solid var(--border-color);
}
</style>
