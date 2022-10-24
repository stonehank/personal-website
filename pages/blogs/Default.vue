<template>
    <v-skeleton-loader
        v-if="blogList == null"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <!-- <ArticleList v-else class="pa-3" :list="blogList" /> -->
</template>

<script>
import blogListJson from 'doc/blog/.blog-list.json'
export default {
    name: 'Default',
    data() {
        return {
            timer: null,
            blogList: null,
        }
    },
    mounted() {
        const arr = []
        for (const k in blogListJson) {
            arr.push(blogListJson[k])
        }
        this.timer = setTimeout(() => (this.blogList = arr), 200)
    },
    destroyed() {
        clearTimeout(this.timer)
    },
}
</script>

<style scoped></style>
