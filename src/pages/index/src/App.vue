<template>
    <v-app>
        <Navigation />
        <main
                :style="{
                        marginTop:navH + 'px'
                    }"
        >
            <router-view :a="3"></router-view>
        </main>
        <ScrTopBtn />
    </v-app>
</template>

<script>

    import Navigation from "pagesDir/index/src/components/Navigation/index";
    import ScrTopBtn from "pagesDir/index/src/commons/ScrTopBtn";
    import AutoMeta from "pagesDir/index/src/utils/AutoMeta";
    export default {
        name: "App",
        components: {
            ScrTopBtn,
            Navigation,
        },
        watch:{
            $route:{
                handler:AutoMeta
            }
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
