<template>
    <section :style="`margin-top:-${$getNavH()}px`">
        <HomeOverview />
        <client-only>
            <section style="height: 100vh">
                <v-container style="max-width: 980px">
                    <v-row>
                        <v-col
                            cols="12"
                            :style="{ marginTop: $getNavH() + 'px' }"
                        >
                            <h2>评论区</h2>
                        </v-col>
                        <v-col cols="12">
                            <CommentPanel uniq-str="home-page" />
                        </v-col>
                    </v-row>
                </v-container>
            </section>
        </client-only>
    </section>
</template>

<script>
export default {
    name: 'IndexPage',
    inject: ['hideNav', 'showNav'],
    created() {
        this.hideNav()
    },
    mounted() {
        $(window).on('scroll', this.toggleNavOnScroll)
    },
    beforeDestroy() {
        this.showNav()
    },
    destroyed() {
        $(window).off('scroll', this.toggleNavOnScroll)
    },
    methods: {
        toggleNavOnScroll() {
            if ($(document).scrollTop() >= this.$getWinH() * 0.1) {
                this.showNav()
            } else {
                this.hideNav()
            }
        },
    },
}
</script>
