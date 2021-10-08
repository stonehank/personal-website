<template>
    <vue-bbs-counter :uniqStr="uniqStr"/>
</template>

<script>
    import VueBbsCounter from "vue-bbs/dist/lib/vue-bbs-counter";
    import LeancloudLayer from 'vue-bbs/dist/backend/leancloud'
    VueBbsCounter.extends.extends=LeancloudLayer
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
