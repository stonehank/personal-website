<template>
    <vue-bbs-counter :uniq-str="uniqStr" />
</template>

<script>
// import VueBbsCounter from 'vue-bbs/dist/lib/vue-bbs-counter'
// import LeancloudLayer from 'vue-bbs/dist/backend/leancloud'
// import registerServer from 'vue-bbs/dist/registerServer'
// registerServer(VueBbsCounter, LeancloudLayer)
export default {
    // components: { VueBbsCounter },
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
