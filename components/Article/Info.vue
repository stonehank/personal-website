<template>
    <section class="d-flex">
        <ArticleTableOfContent
            v-if="$vuetify.breakpoint.mdAndUp"
            :toc="articleDetails.toc"
        />
        <v-container
            id="article-content"
            tag="article"
            :style="$vuetify.breakpoint.mdAndUp ? 'margin-left:256px' : ''"
        >
            <v-card flat>
                <v-card-title class="mb-2">
                    <h1 class="text-lg">{{ articleDetails.title }}</h1>
                </v-card-title>
                <v-card-subtitle>
                    <ArticleTags :tags="articleDetails.relatedTags" />
                    <div class="text-sm d-flex justify-space-between mt-2">
                        <div class="d-flex align-center">
                            <DateRender :date="articleDetails.created_at" />
                            <b class="text-md mx-2">·</b>
                            <ArticleCommentCount>
                                <comment-counter
                                    :uniq-str="'article-' + articleDetails.sha"
                                />
                            </ArticleCommentCount>
                        </div>
                    </div>
                </v-card-subtitle>
                <v-card-text>
                    <div
                        class="text-primary markdown-body"
                        v-html="articleDetails.content"
                    ></div>
                </v-card-text>
            </v-card>
            <v-divider class="my-4" />
            <CommentPanel :uniq-str="'article-' + articleDetails.sha" />
        </v-container>
    </section>
</template>

<script>
export default {
    name: 'ArticleInfo',
    props: {
        articleDetails: {
            default: () => ({}),
            type: Object,
        },
    },
    data() {
        return {
            tocIdList: Array(this.articleDetails.toc.length).fill(''),
        }
    },
    watch: {
        articleDetails: {
            handler() {
                this.updateTocIdList()
                // console.log('watch slug nest',this.tocIdList)
            },
        },
    },
    mounted() {
        this.updateTocIdList()
        $(window).on('scroll', this.updateOnScroll)
    },
    destroyed() {
        $(window).off('scroll', this.updateOnScroll)
    },
    methods: {
        updateTocIdList() {
            this.tocIdList = Array(this.articleDetails.toc.length).fill('')
            if (this.tocIdList.length === 0) return
            this.articleDetails.toc.forEach((obj, i) => {
                this.tocIdList[i] = '#' + obj.anchor
            })
        },
        updateOnScroll() {
            const curScrTop = Math.floor($('html')[0].scrollTop)
            const navH = this.$getNavH()
            for (let i = this.tocIdList.length - 1; i >= 0; i--) {
                const curIdHash = this.tocIdList[i]
                // console.log(curIdHash)
                if (curScrTop + navH + 16 > $(curIdHash).offset().top) {
                    if (this.$route.hash !== curIdHash) {
                        this.$router.replace({ hash: curIdHash })
                    }
                    break
                }
            }
        },
    },
}
</script>

<style scoped></style>
