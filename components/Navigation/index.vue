<template>
    <v-app-bar
            id="nav-header"
            color="var(--foreground-color)"
            fixed
            flat
            :height="$vuetify.breakpoint.smAndDown ? 56 : 64"
            :value="show"
            transition="slide-y-transition"
    >

        <Action />
        <BookMark />
        <v-spacer></v-spacer>
        <Search class="mr-2"/>
        <Theme />

    </v-app-bar>
</template>

<script>
    import Theme from "./components/Theme";
    import Action from "./components/Action";
    import BookMark from "./components/BookMark";
    import Search from "./components/Search";
    export default {
        name: "Navigation",
        components: {BookMark, Action, Theme, Search},
        props:{
            show:Boolean,
        },
        mounted(){
            console.log(this.$vuetify.breakpoint)
        }
    }
</script>

<style scoped>
    #nav-header{
        z-index: 900;
    }
</style>
