<template>
    <v-card class="mx-auto h-100 d-flex flex-column" v-bind="$attrs">
        <v-card-title class="pt-2 pb-1 text-break">
            <router-link :to="'/article/' + articleHeader.slug">
                <h3 class="text-lg">{{ articleHeader.title }}</h3>
            </router-link>
        </v-card-title>

        <v-card-text class="d-flex flex-column justify-space-start flex-grow-1">
            <div>
                <ArticleTags :tags="articleHeader.relatedTags" />
                <div class="text-sm d-flex justify-space-start">
                    <DateRender :date="articleHeader.created_at" />
                </div>
            </div>
            <div
                class="text-secondary text-xs summary-body"
                v-html="articleHeader.summary"
            ></div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'ArticleCard',
    props: {
        articleHeader: {
            type: Object,
            default: () => ({
                title: String,
                img: {
                    type: String,
                    default: 'https://picsum.photos/500',
                },
                description: String,
                date: String,
                tags: Array,
            }),
        },
    },
}
</script>

<style scoped></style>
