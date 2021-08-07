<template>
    <span>
        <v-icon small>fas fa-comment</v-icon>
        {{commentCount}}
    </span>
</template>

<script>
    export default {
        name: "CommentCount",
        props:{
            commentCount:Number
        }
    }
</script>

<style scoped>

</style>
