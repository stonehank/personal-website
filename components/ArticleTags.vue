<template>
    <div>
        <v-chip
            v-for="(tag, idx) in tags"
            :key="idx"
            class="mr-1 mb-1"
            label
            small
            :color="labelColor[tag]"
            text-color="white"
            :to="'/labels/' + tag"
            @click="clickEvent"
        >
            {{ tag }}
        </v-chip>
    </div>
</template>

<script>
import labelColor from 'utils/label-color'

export default {
    name: 'ArticleTags',
    props: {
        tags: Array,
        clickEvent: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        labelColor: () => labelColor,
    },
}
</script>

<style scoped></style>
