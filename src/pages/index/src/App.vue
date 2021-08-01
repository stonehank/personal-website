<template>
    <v-app>
        <Navigation />
        <main
                :style="{
                    marginTop:navH + 'px'
                }"
        >
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </main>

    </v-app>
</template>

<script>
    import Navigation from "pagesDir/index/src/components/Navigation/index";
    export default {
        name: "App",
        components: {Navigation},
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
