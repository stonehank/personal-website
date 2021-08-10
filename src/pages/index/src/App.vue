<template>
    <v-app>
        <Navigation />
        <main
                :style="{
                        marginTop:navH + 'px'
                    }"
        >
            <router-view></router-view>
        </main>
<!--        <Valine appId="s8REl9WtWtOw7omr7frVIpMP-MdYXbMMI"-->
<!--                appKey="amadgvU7WzMYQ9eqMatTHLWM"-->
<!--                :editMode=true-->
<!--                CommentClass="Comment_blog"-->
<!--                CounterClass="Counter_blog"-->
<!--                placeholder="说点什么吧，: 开启表情输入"-->
<!--                :themeMode="$vuetify.theme.isDark ? 'dark' : 'light'"-->
<!--        >-->
<!--           -->
<!--        </Valine>-->
        <ScrTopBtn />
    </v-app>
</template>

<script>

    import {modify_hljs, Valine,ValinePanel} from "./utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    modify_hljs((hljs)=>{
        const python = require('highlight.js/lib/languages/python')
        hljs.registerLanguage('python', python)
        return hljs
    })
    import Navigation from "pagesDir/index/src/components/Navigation/index";
    import ScrTopBtn from "pagesDir/index/src/commons/ScrTopBtn";
    export default {
        name: "App",
        components: {
            ScrTopBtn,
            Navigation,
            Valine:applyReactInVue(Valine),
        },
        data(){
            return {
                navH:64,
            }
        },
        mounted(){
            this.navH = $('#nav-header').outerHeight()
            console.log(this.navH)
        },
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        position:absolute;
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
