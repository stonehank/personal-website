<template>
    <vue-bbs :uniqStr="uniqStr" :offset="$state.getNavH() + 8"/>
</template>

<script>
    import VueBbs from "vue-bbs/dist/lib/vue-bbs";
    import LeancloudLayer from 'vue-bbs/dist/backend/leancloud'
    import registerServer from 'vue-bbs/dist/registerServer'
    registerServer(VueBbs,LeancloudLayer)
    export default {
        name: "CommentSysPanel",
        components: {VueBbs},
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
