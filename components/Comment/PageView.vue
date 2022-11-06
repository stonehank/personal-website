<template>
    <vue-bbs-pageview :uniq-str="uniqStr" />
</template>

<script>
// import VueBbsPageview from "vue-bbs/dist/lib/vue-bbs-pageview";
// import LeancloudLayer from 'vue-bbs/dist/backend/leancloud'
// import registerServer from 'vue-bbs/dist/registerServer'
// registerServer(VueBbsPageview,LeancloudLayer)
export default {
    // components: {VueBbsPageview},
    props: {
        uniqStr: {
            type: String,
            default: process.client
                ? decodeURI(window.location.origin + window.location.pathname)
                : '',
        },
    },
}
</script>

<style scoped></style>
