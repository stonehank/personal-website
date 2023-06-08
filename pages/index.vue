<template>
    <section
        :style="{
            'margin-top': `-${$getNavH()}px`,
            height: `${$getWinH()}px`,
        }"
        class="position-relative overflow-hidden"
    >
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide>
                <HomeOverview />
            </swiper-slide>
            <swiper-slide>
                <section class="h-screen">
                    <v-container class="max-w-5xl">
                        <v-row>
                            <v-col
                                cols="12"
                                :style="{ marginTop: $getNavH() + 'px' }"
                            >
                                <h2>评论区</h2>
                            </v-col>
                            <v-col cols="12">
                               <client-only>
                                 <CommentPanel uniq-str="home-page" />
                               </client-only>
                            </v-col>
                        </v-row>
                    </v-container>
                </section>
            </swiper-slide>
        </swiper>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'IndexPage',
    components: {
        Swiper,
        SwiperSlide,
    },
    inject: ['hideNav', 'showNav'],
    data() {
        const self = this
        return {
            swiperOption: {
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 30,
                mousewheel: true,
                on: {
                    slideChangeTransitionEnd: function () {
                        const idx = this.activeIndex
                        if (idx === 0) {
                            self.hideNav()
                        } else {
                            self.showNav()
                        }
                    },
                },
            },
        }
    },
    created() {
        this.hideNav()
    },
    mounted() {
        // $(window).on('scroll', this.toggleNavOnScroll)
    },
    beforeDestroy() {
        this.showNav()
    },
    destroyed() {
        // $(window).off('scroll', this.toggleNavOnScroll)
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
<style lang="scss" scoped>
::v-deep .swiper {
    height: 100%;
    .swiper-wrapper {
        height: 100%;
    }
}
</style>
