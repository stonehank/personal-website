<template>
    <vue-bbs :uniq-str="uniqStr" />
</template>

<script>
// import VueBbs from "vue-bbs/dist/lib/vue-bbs";
// import LeancloudLayer from 'vue-bbs/dist/backend/leancloud'
// import registerServer from 'vue-bbs/dist/registerServer'
// registerServer(VueBbs,LeancloudLayer)
export default {
    // components: {VueBbs},
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
