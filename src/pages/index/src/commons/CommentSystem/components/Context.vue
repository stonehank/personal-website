<template>
    <VueValine appId="s8REl9WtWtOw7omr7frVIpMP-MdYXbMMI"
            appKey="amadgvU7WzMYQ9eqMatTHLWM"
            :editMode=true
            CommentClass="Comment_blog"
            CounterClass="Counter_blog"
            placeholder="说点什么吧，: 开启表情输入"
            :themeMode="$vuetify.theme.isDark ? 'dark' : 'light'"
    >
        <slot></slot>
    </VueValine>
</template>

<script>
   import {VueValine} from './ReactToVue'
    export default {
        name: "ContextVue",
        components:{
            VueValine
        }
    }
</script>

<style scoped>

</style>
