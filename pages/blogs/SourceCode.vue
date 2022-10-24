<template>
    <v-skeleton-loader
        v-if="sourceCodeList == null"
        type="article,image,list-item-two-line"
    ></v-skeleton-loader>
    <ArticleList v-else class="pa-3" :list="sourceCodeList" />
</template>

<script>
import sourceCodeList from 'doc/sourceCode/.sourceCode-list.json'
export default {
    name: 'SourceCode',
    data() {
        return {
            timer: null,
            sourceCodeList: null,
        }
    },
    mounted() {
        const arr = []
        for (const k in sourceCodeList) {
            arr.push(sourceCodeList[k])
        }
        this.timer = setTimeout(() => (this.sourceCodeList = arr), 200)
    },
    destroyed() {
        clearTimeout(this.timer)
    },
}
</script>

<style scoped></style>
