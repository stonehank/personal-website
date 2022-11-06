<template>
    <v-card class="mx-auto h-100 d-flex flex-column">
        <img
            :src="projectInfo.img"
            style="height: 200px; cursor: zoom-in"
            :preview="Math.floor(Math.random() * 1e9 + 7)"
        />
        <div class="flex-grow-1">
            <v-card-title class="pt-2 pb-1 text-lg">
                {{ projectInfo.title }}
            </v-card-title>
            <v-card-text
                class="text-secondary text-md"
                v-html="projectInfo.description"
            />
        </div>
        <v-card-actions>
            <v-btn
                :href="projectInfo.path"
                style="text-transform: none"
                text
                color="primary"
            >
                Explore on github
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                v-if="projectInfo.preview_path"
                :href="projectInfo.preview_path"
                text
                color="success"
            >
                Demo
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        projectInfo: {
            type: Object,
            default: () => ({
                title: String,
                img: {
                    type: String,
                    default: 'https://picsum.photos/500',
                },
                description: String,
            }),
        },
    },
}
</script>

<style scoped></style>
