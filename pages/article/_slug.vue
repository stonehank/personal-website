<template>
    <!-- <v-skeleton-loader
        v-if="loading"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader> -->
    <ArticleInfo v-if="articleDetails" :article-details="articleDetails" />
    <Error v-else />
</template>

<script>
import cloneDeep from 'clone-deep'
export default {
    async asyncData({ params }) {
        const slug = params?.slug
        const articleDetails = await import(
            '../../assets/doc/blog/' + slug + '.json'
        )
            .then((module) => cloneDeep(module.default))
            .catch((_) =>
                import('../../assets/doc/sourceCode/' + slug + '.json').then(
                    (module) => cloneDeep(module.default)
                )
            )

        return {
            slug,
            articleDetails,
        }
    },
    data() {
        return {
            // articleDetails: null,
            // fetchError: false,
            // loading: true,
        }
    },
    watch: {
        slug: {
            immediate: true,
            handler(slug) {
                if (this.articleDetails) return
                // this.loading = true
                if (!slug) {
                    // this.loading = false
                    // this.fetchError = true
                    return
                }
                this.init(slug)
            },
        },
    },
    methods: {
        init(slug) {
            return import('../../assets/doc/blog/' + slug + '.json')
                .then((module) => {
                    this.articleDetails = cloneDeep(module.default)
                })
                .catch((_) => {
                    return import(
                        '../../assets/doc/sourceCode/' + slug + '.json'
                    ).then((module) => {
                        this.articleDetails = cloneDeep(module.default)
                    })
                })
            // .then(() => {
            //     this.fetchError = false
            //     this.loading = false
            // })
            // .catch(() => {
            //     this.fetchError = true
            //     this.loading = false
            // })
        },
    },
}
</script>

<style scoped></style>
