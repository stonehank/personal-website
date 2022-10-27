<template>
    <ul>
        <li v-for="(item, index) in curLevelToc" :key="index">
            <v-btn
                class="mt-1"
                :class="'toc-title-' + item.level"
                small
                text
                replace
                :to="'#' + decodeURI(item.anchor)"
                active-class="active"
                @click="() => scrollTo('#' + item.anchor)"
                v-html="item.text"
            >
            </v-btn>
            <TocList v-if="item.children" :cur-level-toc="item.children" />
        </li>
    </ul>
</template>

<script>
import scrollTo from 'utils/scrollTo'
export default {
    name: 'TocList',
    props: {
        curLevelToc: Array,
    },
    data() {
        return {
            initTimer: null,
        }
    },
    computed: {
        scrollTo: () => scrollTo,
    },
    updated() {
        console.log('update toc list')
    },
    mounted() {
        $(document).ready(() => {
            this.initTimer = setTimeout(() => {
                const hash = decodeURI(this.$route.hash)
                if (hash) {
                    this.scrollTo(hash)
                }
            }, 0)
        })
    },
    destroyed() {
        clearTimeout(this.initTimer)
    },
}
</script>

<style scoped lang="scss">
ul {
    a {
        color: var(--text-secondary);

        &:hover {
            color: var(--text-primary);
        }
    }
}
ul > ul {
    left: 24px;
}
.active {
    color: var(--info-color);
}
</style>
