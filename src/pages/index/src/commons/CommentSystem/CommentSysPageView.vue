<template>
    <vue-bbs-pageview :uniqStr="uniqStr"/>
</template>

<script>
    import VueBbsPageview from "vue-bbs/dist/vue-bbs-pageview";
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
