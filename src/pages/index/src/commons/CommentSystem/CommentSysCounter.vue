<template>
    <vue-bbs-counter :uniqStr="uniqStr"/>
</template>

<script>
    import VueBbsCounter from "vue-bbs/dist/vue-bbs-counter";
    // import VueBbsCounter from "../../utils/vue-bbs/components/ServerlessBBSCounter";
    export default {
        name: "CommentSysCounter",
        components: {VueBbsCounter},
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
    }
</script>

<style scoped>

</style>
