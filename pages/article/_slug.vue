<template>
    <v-skeleton-loader
        v-if="loading"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleInfo v-else-if="!fetchError" :article-details="articleDetails" />
    <Error v-else />
</template>

<script>
import cloneDeep from 'clone-deep'
export default {
    asyncData({ params }) {
        return { slug: params?.slug }
    },
    data() {
        return {
            articleDetails: null,
            fetchError: false,
            loading: true,
        }
    },
    watch: {
        slug: {
            immediate: true,
            handler(slug) {
                this.loading = true
                if (!slug) {
                    this.loading = false
                    this.fetchError = true
                    return
                }
                this.init(slug)
            },
        },
    },
    methods: {
        async init(slug) {
            try {
                const module = await import(
                    '../../assets/doc/blog/' + slug + '.json'
                )
                this.articleDetails = cloneDeep(module.default)
                this.fetchError = false
                this.loading = false
            } catch (err) {
                console.error(err)
                this.loading = false
                this.fetchError = true
            }
        },
    },
}
</script>

<style scoped></style>
