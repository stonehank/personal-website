<template>
    <ContextVue>
        <PageViewVue :uniqStr="uniqStr" />
    </ContextVue>
</template>

<script>
    import ContextVue from "pagesDir/index/src/commons/CommentSystem/components/Context";
    import PageViewVue from "pagesDir/index/src/commons/CommentSystem/components/PageView";
    export default {
        name: "CommentSysPageView",
        components: {PageViewVue, ContextVue},
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
