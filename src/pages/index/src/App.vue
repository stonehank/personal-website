<template>
        <v-app>

            <Navigation :show="navShowing" />
            <main
                    :style="{
                        marginTop:navH + 'px'
                    }"
            >
                <router-view></router-view>
            </main>
            <ScrTopBtn />
            <div id="taskInfoModalWrap"></div>
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
        computed:{
            navH:function(){
                return this.$vuetify.breakpoint.smAndDown ? 56 : 64
            }
        },
        watch:{
            $route:{
                handler:AutoMeta
            }
        },
        data(){
            return {
                navShowing:false,
            }
        },
        mounted(){
            // this.$state.add('showNav',this.showNav)
            // this.$state.add('hideNav',this.hideNav)
            $(window).on('scroll',this.toggleNavOnScroll)
        },
        destroyed() {
            $(window).off('scroll',this.toggleNavOnScroll)
        },
        updated(){
            this.toggleNavOnScroll()
        },
        methods:{
            toggleNavOnScroll(){
                if(window.location.pathname!=='/'){
                    this.showNav()
                    return
                }
                if($(document).scrollTop() >= window.innerHeight * 0.1){
                    this.showNav()
                }else{
                    this.hideNav()
                }
            },
            showNav(){
                this.navShowing=true
            },
            hideNav(){
                this.navShowing=false
            }
        }
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
