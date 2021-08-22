<template>
    <ContextVue>
        <CounterVue :uniqStr="uniqStr" />
    </ContextVue>
</template>

<script>
    import ContextVue from "pagesDir/index/src/commons/CommentSystem/components/Context";
    import CounterVue from "pagesDir/index/src/commons/CommentSystem/components/Counter";
    export default {
        name: "CommentSysCounter",
        components: {CounterVue, ContextVue},
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
