<template>
    <p v-if="items.length === 0" class="display-1 mt-4 text-secondary">
        无数据
    </p>
    <v-data-table v-else :headers="headers" :items="items">
        <template #item.title="{ item }">
            <router-link :to="getItemPath(item)">{{ item.title }}</router-link>
        </template>
        <template #item.relatedTags="{ value }">
            <ArticleTags :tags="value" />
        </template>
        <template #item.careted_at="{ value }">
            <span>
                {{ dateFormat(value, 'yyyy-mm-dd') }}
            </span>
        </template>
    </v-data-table>
</template>

<script>
import { dateFormat } from 'utils/date/date-format'
export default {
    name: 'ArticleTableList',
    props: {
        headers: Array,
        items: Array,
    },
    computed: {
        dateFormat: () => dateFormat,
    },
    methods: {
        getItemPath(item) {
            let pathname = ''
            switch (item.flag) {
                case '随笔':
                case '源码阅读':
                    pathname = '/articles'
                    break
                case '算法':
                    pathname = '/algorithm'
                    break
                default:
                    break
            }
            return `${pathname}/${item.slug}`
        },
    },
}
</script>

<style scoped></style>
