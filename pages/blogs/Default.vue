<template>
    <v-skeleton-loader
        v-if="loading"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleList v-else class="pa-3" :list="blogList" />
</template>

<script>
export default {
    name: 'Default',
    async asyncData() {
        const blogListJson = await import('doc/blog/.blog-list.json')
        const arr = []
        for (const k in blogListJson) {
            arr.push(blogListJson[k])
        }
        return {
            blogList: arr,
            loading: true,
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.loading = false
        })
    },
}
</script>

<style scoped></style>
