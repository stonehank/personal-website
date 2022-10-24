<template>
    <v-fab-transition>
        <v-btn
            v-show="show"
            v-scroll="onScroll"
            icon
            style="background:var(--theme-primary);bottom:96px;"
            fixed
            right
            elevation="4"
            large
            @click="scrollTo"
        >
            <v-icon small color="white">fas fa-angle-up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
    import scrollTo from "utils/scrollTo";

    export default {
        name: "ScrTopBtn",
        data(){
            return {
                show:false
            }
        },
        computed:{
            scrollTo:()=>scrollTo
        },
        methods:{
            onScroll(e){
                const scrTop=$(e.target).scrollTop()
                this.show = scrTop > window.innerHeight * 1.5;
            },
        }
    }
</script>

<style scoped>

</style>
