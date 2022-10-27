<template>
    <v-skeleton-loader
        v-if="loading"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <AlgorithmInfo v-else :article-details="articleDetails" />
</template>

<script>
import cloneDeep from 'clone-deep'
export default {
    name: 'Algorithm',
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
                }
                this.init(slug)
                // .then(()=>{
                //     AutoMeta(this.$route,{},{
                //         "title": '算法思路-'+this.articleDetails.title,
                //         "og_title": '算法思路-'+this.articleDetails.title,
                //         "keywords": this.articleDetails.relatedTags.join(','),
                //         "og_url": window.wmpConfig.domain + this.$route.path,
                //         "description": this.articleDetails.title,
                //         "og_description": this.articleDetails.title,
                //         "og_image": null
                //     })
                // })
            },
        },
    },
    methods: {
        async init(slug) {
            try {
                const module = await import(
                    '../../assets/doc/leetcode/' + slug + '.json'
                )
                this.articleDetails = cloneDeep(module.default)
                this.fetchError = false
                this.loading = false
            } catch (err) {
                this.loading = false
                this.fetchError = true
            }
        },
    },
}
</script>

<style scoped></style>
