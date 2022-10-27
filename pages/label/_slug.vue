<template>
    <v-skeleton-loader
        v-if="curLabelList == null"
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
            <div class="text-right">
                <v-btn icon x-large to="/blogs/labels">
                    <v-icon large>fas fa-long-arrow-alt-left</v-icon>
                </v-btn>
                <v-chip
                    large
                    label
                    style="min-width: 120px"
                    class="justify-center display-1"
                    :color="labelColor[label]"
                    text-color="white"
                >
                    {{ label }}
                </v-chip>
                <p class="text-lg">总共 {{ curLabelList.length }} 篇</p>
            </div>
        </v-navigation-drawer>
        <div :style="$vuetify.breakpoint.mdAndUp ? 'margin-left:320px;' : ''">
            <div v-if="$vuetify.breakpoint.smAndDown">
                <h1>
                    <v-chip label :color="labelColor[label]" text-color="white">
                        {{ label }}
                    </v-chip>
                    <span class="text-md"
                        >总共 {{ curLabelList.length }} 篇</span
                    >
                </h1>
            </div>
            <ArticleTableList :headers="headers" :items="curLabelList" />
        </div>
    </section>
</template>

<script>
import { getTagsObj } from 'utils/list-json-controller'
import labelColor from 'utils/label-color'

export default {
    asyncData({ params }) {
        return { slug: params?.slug }
    },
    data() {
        return {
            curLabelList: null,
            label: null,
            fetchError: false,
            loading: true,
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
    computed: {
        labelColor: () => labelColor,
    },
    watch: {
        slug: {
            immediate: true,
            handler: function (newV, oldV) {
                if (newV !== oldV) {
                    this.label = newV
                    this.curLabelList = getTagsObj(this.label)
                    this.sortLabel()
                }
            },
        },
    },
    created() {
        this.loading = true
        this.label = this.slug
        if (!this.label) {
            this.loading = false
            this.fetchError = true
        }
        this.curLabelList = getTagsObj(this.label)
        this.sortLabel()

        // AutoMeta(
        //     this.$route,
        //     {},
        //     {
        //         title: this.label + '标签下文章',
        //         og_title: this.label + '标签下文章',
        //         keywords: this.curLabelList
        //             .map((obj) => obj.relatedTags)
        //             .join(','),
        //         og_url: window.wmpConfig.domain + this.$route.path,
        //         description:
        //             this.label +
        //             '标签下文章包括：' +
        //             this.curLabelList.map((obj) => obj.title).join(','),
        //         og_description:
        //             this.label +
        //             '标签下文章包括：' +
        //             this.curLabelList.map((obj) => obj.title).join(','),
        //         og_image: null,
        //     }
        // )
    },
    methods: {
        sortLabel() {
            this.curLabelList.forEach((obj) => {
                obj.relatedTags.sort((a, b) => (a === this.label ? -1 : 1))
            })
        },
    },
}
</script>

<style scoped></style>
