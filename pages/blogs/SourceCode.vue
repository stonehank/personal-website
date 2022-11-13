<template>
    <v-skeleton-loader
        v-if="loading"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleList v-else class="pa-3" :list="sourceCodeList" />
</template>

<script>
export default {
    name: 'SourceCode',

    async asyncData() {
        const sourceCodeJson = await import(
            'doc/sourceCode/.sourceCode-list.json'
        )
        const arr = []
        for (const k in sourceCodeJson) {
            arr.push(sourceCodeJson[k])
        }
        return {
            sourceCodeList: arr,
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
