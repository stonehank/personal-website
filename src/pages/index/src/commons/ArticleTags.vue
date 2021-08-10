<template>
    <div>
        <v-chip
                v-for="(tag,idx) in tags"
                :key="idx"
                class="mr-1 mb-1"
                label
                small
        >
            {{tag}}
        </v-chip>
    </div>
</template>

<script>
    export default {
        name: "ArticleTags",
        props:{
            tags:Array,
        }
    }
</script>

<style scoped>

</style>
