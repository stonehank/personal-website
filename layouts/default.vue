<template>
    <v-app>
        <Navigation :show="navShowing" />
        <main
            :style="{
                marginTop: $getNavH() + 'px',
            }"
        >
            <Nuxt />
        </main>
        <ScrTopBtn />
        <div id="taskInfoModalWrap"></div>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    provide() {
        return {
            showNav: this.showNav,
            hideNav: this.hideNav,
        }
    },
    data() {
        return {
            navShowing: true,
        }
    },
    methods: {
        showNav() {
            this.navShowing = true
        },
        hideNav() {
            this.navShowing = false
        },
    },
}
</script>
