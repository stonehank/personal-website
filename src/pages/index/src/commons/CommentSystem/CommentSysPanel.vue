<template>
    <ContextVue>
        <PanelVue :uniqStr="uniqStr" />
    </ContextVue>
</template>

<script>
    import ContextVue from "pagesDir/index/src/commons/CommentSystem/components/Context";
    import PanelVue from "pagesDir/index/src/commons/CommentSystem/components/Panel";
    export default {
        name: "CommentSysPanel",
        components: {PanelVue, ContextVue},
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
