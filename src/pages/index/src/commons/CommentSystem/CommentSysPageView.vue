<template>
    <vue-bbs-pageview :uniqStr="uniqStr"/>
</template>

<script>
    import VueBbsPageview from "vue-bbs/dist/lib/vue-bbs-pageview";
    import LeancloudLayer from 'vue-bbs/dist/backend/leancloud'
    import registerServer from 'vue-bbs/dist/registerServer'
    registerServer(VueBbsPageview,LeancloudLayer)
    export default {
        name: "CommentSysPageView",
        components: {VueBbsPageview},
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
