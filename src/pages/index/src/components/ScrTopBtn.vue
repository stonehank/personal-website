<template>
    <v-fab-transition>
        <v-btn icon
               v-scroll="onScroll"
               style="background:var(--theme-primary)"
               fixed
               right
               bottom
               elevation="4"
               large
               v-show="show"
               @click="$vuetify.goTo(0,{
                   duration:300,
                   easing:'linear',
               })"
        >
            <v-icon small color="white">fas fa-angle-up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
    export default {
        name: "ScrTopBtn",
        data(){
            return {
                show:false
            }
        },
        methods:{
            onScroll(e){
                let scrTop=$(e.target).scrollTop()
                this.show = scrTop > window.innerHeight * 1.5;
            }
        }
    }
</script>

<style scoped>

</style>
