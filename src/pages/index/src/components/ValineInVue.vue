<template>
    <Valine appId="s8REl9WtWtOw7omr7frVIpMP-MdYXbMMI"
            appKey="amadgvU7WzMYQ9eqMatTHLWM"
            :editMode=true
            CommentClass="Comment_blog"
            CounterClass="Counter_blog"
            placeholder="说点什么吧，: 开启表情输入"
            :themeMode="themeMode"
    >
        <ValinePanel  />
    </Valine>
</template>

<script>
    import {modify_hljs, Valine,ValinePanel} from "../utils/react-valine/react-valine.js"
    // import {modify_hljs, Valine,ValinePanel} from "react-valine"
    import {applyReactInVue} from 'vuereact-combined'
    modify_hljs((hljs)=>{
        const python = require('highlight.js/lib/languages/python')
        hljs.registerLanguage('python', python)
        return hljs
    })
    export default {
        name: "ValineInVue",
        props:{
            themeMode:String,
        },
        components:{
            Valine:applyReactInVue(Valine),
            ValinePanel:applyReactInVue(ValinePanel),
        }
    }
</script>

<style scoped>

</style>
