<template>
    <vue-bbs :uniqStr="uniqStr" :offset="$state.getNavH() + 8"/>
</template>

<script>
    import VueBbs from "vue-bbs/dist/vue-bbs";
    // import VueBbs from "../../utils/vue-bbs/components/ServerlessBBSPanel";
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
