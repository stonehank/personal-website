<template>
    <v-app>
        <client-only placeholder="Loading...">
            <Navigation :show="navShowing" />
        </client-only>

        <main
            :style="{
                marginTop: navH + 'px',
                height: '2000px',
            }"
        >
            <Nuxt />
        </main>
        <ScrTopBtn />
        <div id="taskInfoModalWrap"></div>
    </v-app>
</template>

<script>
import '~/assets/css/common.scss'
import '~/assets/css/_variables.scss'
export default {
    name: 'DefaultLayout',
    data() {
        return {
            navShowing: true,
        }
    },
    computed: {
        navH: function () {
            return this.$vuetify.breakpoint.smAndDown ? 56 : 64
        },
    },
    mounted() {
        this.$state.add('showNav', this.showNav)
        this.$state.add('hideNav', this.hideNav)
        $(window).on('scroll', this.toggleNavOnScroll)
    },
    destroyed() {
        $(window).off('scroll', this.toggleNavOnScroll)
    },
    updated() {
        this.toggleNavOnScroll()
    },
    methods: {
        toggleNavOnScroll() {
            if (window.location.pathname !== '/') {
                this.showNav()
                // return
            }
            if ($(document).scrollTop() >= window.innerHeight * 0.1) {
                this.showNav()
            } else {
                this.hideNav()
            }
        },
        showNav() {
            this.navShowing = true
        },
        hideNav() {
            this.navShowing = false
        },
    },
}
</script>
