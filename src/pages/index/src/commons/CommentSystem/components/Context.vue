<template>
    <Valine appId="s8REl9WtWtOw7omr7frVIpMP-MdYXbMMI"
            appKey="amadgvU7WzMYQ9eqMatTHLWM"
            :editMode=true
            CommentClass="Comment_blog"
            CounterClass="Counter_blog"
            placeholder="说点什么吧，: 开启表情输入"
            :themeMode="$vuetify.theme.isDark ? 'dark' : 'light'"
    >
        <slot></slot>
    </Valine>
</template>

<script>
    import {modify_hljs, Valine} from "../../../utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    modify_hljs((hljs)=>{
        const python = require('highlight.js/lib/languages/python')
        hljs.registerLanguage('python', python)
        return hljs
    })
    export default {
        name: "ContextVue",
        components:{
            Valine:applyReactInVue(Valine)
        }
    }
</script>

<style scoped>

</style>
