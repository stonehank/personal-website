<template>
    <v-app-bar
            id="nav-header"
            color="var(--foreground-color)"
            fixed
            elevate-on-scroll
    >
        <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown"></v-app-bar-nav-icon>

        <Action />

        <v-spacer></v-spacer>
        <Search class="mr-2"/>
        <Theme />
    </v-app-bar>
</template>

<script>
    import Search from "pagesDir/index/src/components/Navigation/components/Search";
    import Theme from "pagesDir/index/src/components/Navigation/components/Theme";
    import Action from "pagesDir/index/src/components/Navigation/components/Action";
    export default {
        name: "Navigation",
        components: {Action, Theme, Search},
        mounted(){
            console.log(this.$vuetify.breakpoint)
        }
    }
</script>

<style scoped>

</style>
