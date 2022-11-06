<template>
    <v-navigation-drawer
        permanent
        fixed
        class="pa-4"
        :style="{
            top: $getNavH() + 'px',
            left: 0,
        }"
    >
        <v-card-subtitle class="text-lg">文章目录</v-card-subtitle>
        <v-divider></v-divider>
        <span
            v-if="!curToc || curToc.length === 0"
            class="pl-4 text-muted text-lg"
            >暂无</span
        >
        <TocList v-else :cur-level-toc="curToc" />
    </v-navigation-drawer>
</template>

<script>
import TocList from './TocList'
export default {
    name: 'TableOfContent',
    components: { TocList },
    props: {
        toc: Array,
    },
    data() {
        return {
            curToc: null,
        }
    },
    watch: {
        toc: {
            immediate: true,
            deep: true,
            handler: function (newToc) {
                this.curToc = this.parseTocNest(newToc)
            },
        },
    },
    methods: {
        parseTocNest(toc) {
            if (toc.length === 0) return []
            const arr = [toc[0]]
            let lastObj = arr[0]
            for (let i = 1; i < toc.length; i++) {
                const tocData = toc[i]
                if (tocData.level <= lastObj.level) {
                    let parent = lastObj.parent
                    while (parent && parent.level >= tocData.level) {
                        parent = parent.parent
                    }
                    if (parent == null) {
                        arr.push(tocData)
                    } else {
                        tocData.parent = parent
                        parent.children.push(tocData)
                    }
                } else {
                    if (!lastObj.children) {
                        lastObj.children = []
                    }
                    tocData.parent = lastObj
                    lastObj.children.push(tocData)
                }
                lastObj = tocData
            }
            return arr
        },
    },
}
</script>

<style scoped></style>
