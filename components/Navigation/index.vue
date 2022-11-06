<template>
    <v-app-bar
        id="nav-header"
        color="var(--foreground-color)"
        fixed
        flat
        :height="$getNavH()"
        :value="show"
        transition="slide-y-transition"
    >
        <Action />
        <client-only>
            <BookMark />
        </client-only>
        <v-spacer></v-spacer>
        <client-only>
            <Search class="mr-2" />
        </client-only>
        <Theme />
    </v-app-bar>
</template>

<script>
import Theme from './components/Theme'
import Action from './components/Action'
import BookMark from './components/BookMark'
import Search from './components/Search'
export default {
    name: 'Navigation',
    components: { BookMark, Action, Theme, Search },
    props: {
        show: {
            default: true,
            type: Boolean,
        },
    },
    mounted() {
        console.log(this.$vuetify.breakpoint)
    },
}
</script>

<style scoped>
#nav-header {
    z-index: 900;
}
</style>
