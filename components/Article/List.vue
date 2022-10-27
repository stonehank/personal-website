<template>
    <section>
        <ListController
            v-if="selectedInfo"
            ref="listControllerRef"
            v-model="selectedInfo"
            :all-length="articleList.length"
            :per-page="perPage"
            class="position-fixed py-2 w-100"
            style="background: var(--background-color); z-index: 2"
            :style="{
                top: $state.getNavH() + 'px',
                left: ($vuetify.breakpoint.smAndDown ? 0 : 256 + 12) + 'px',
            }"
        />
        <v-divider
            v-if="mounted"
            :style="{
                marginTop: $refs.listControllerRef.$el.offsetHeight - 12 + 'px',
            }"
        />
        <v-list ref="listGroup">
            <v-list-item-group>
                <template v-for="(item, index) in filterArticleList">
                    <ArticleCard
                        :key="index"
                        :article-header="item"
                        :comment-count="12"
                        flat
                    />
                    <v-divider
                        v-if="index < filterArticleList.length - 1"
                        :key="'divider-' + index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </section>
</template>

<script>
// import Vue2Scrollbar from 'vue2-scrollbar'
import scrollTo from 'utils/scrollTo'
// require('vue2-scrollbar/dist/style/vue2-scrollbar.css')
export default {
    name: 'ArticleList',
    props: {
        list: Array,
    },
    data() {
        return {
            mounted: false,
            winH: window.innerHeight,
            articleList: this.list,
            filterArticleList: null,
            perPage: 5,
            selectedInfo: null,
            realPage: null,
        }
    },
    watch: {
        selectedInfo: {
            deep: true,
            handler(newV) {
                if (!newV) return
                const order = newV.order
                const type = newV.type
                const page = newV.page
                if (!order || !type || !page) return
                console.log(order, type)
                if (type && order === 'created_at') {
                    this.articleList = this.sortBy(
                        this.articleList,
                        order,
                        type
                    )
                } else if (type && order === 'relatedTags') {
                    this.articleList = this.sortByLabels(
                        this.articleList,
                        order,
                        type
                    )
                }
                if (page !== this.realPage) {
                    this.realPage = page
                    scrollTo(0, true)
                }
                this.filterArticleList = this.articleList.slice(
                    this.perPage * (page - 1),
                    this.perPage * page
                )
            },
        },
    },
    created() {
        this.selectedInfo = {
            order: 'created_at',
            type: 'desc',
            page: 1,
        }
    },
    mounted() {
        this.mounted = true
    },
    methods: {
        sortByLabels(arr, order, type) {
            const res = type === 'asc' ? -1 : 1
            return arr.sort((a, b) => {
                if (!a[order]) return res
                else if (!b[order]) return -res
                else {
                    return a[order].length === b[order].length
                        ? 0
                        : a[order].length < b[order].length
                        ? res
                        : -res
                }
            })
        },
        sortBy(arr, order, type) {
            const res = type === 'asc' ? -1 : 1
            return arr.sort((a, b) => {
                return a[order] === b[order]
                    ? 0
                    : a[order] < b[order]
                    ? res
                    : -res
            })
        },
    },
}
</script>

<style scoped></style>
