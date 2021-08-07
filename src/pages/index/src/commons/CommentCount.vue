<template>
    <span>
        <v-icon small>far fa-comment-alt</v-icon>
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
