<template>
    <client-only>
        <section
            :style="`height:${wrapperH - 8}px; overflow:hidden`"
            class="position-relative"
        >
            <section
                v-if="!$getIsMobile()"
                class="position-absolute h-100 py-12 d-flex align-center flex-column justify-space-between"
                style="z-index: 10; width: 120px"
            >
                <v-btn
                    fab
                    color="primary"
                    elevation="0"
                    large
                    :disabled="$refs?.swiperRef?.$swiper?.isBeginning"
                    @click="slidePrev"
                >
                    <v-icon small dark>fas fa-chevron-up</v-icon>
                </v-btn>
                <v-btn
                    fab
                    color="primary"
                    elevation="0"
                    large
                    :disabled="$refs?.swiperRef?.$swiper?.isEnd"
                    @click="slideNext"
                >
                    <v-icon small dark>fas fa-chevron-down</v-icon>
                </v-btn>
            </section>
            <swiper ref="swiperRef" class="swiper" :options="swiperOption">
                <swiper-slide
                    v-for="(archiveData, index) in archiveList"
                    :key="index"
                    :data-anchor="archiveData.year"
                >
                    <archive-details
                        :archive-data="archiveData"
                        :start="startList[index]"
                    />
                </swiper-slide>
            </swiper>
        </section>
    </client-only>
</template>

<script>
import { getAllYearsInfo } from 'utils/list-json-controller'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Archive',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        const self = this
        return {
            wrapperH: 0,
            swiperOption: {
                speed: 300,
                direction: 'vertical',
                mousewheel: false,
                on: {
                    init: function () {
                        setTimeout(() => {
                            self.$set(self.startList, 0, true)
                        }, 0)
                    },
                    slideChangeTransitionEnd: function () {
                        const idx = this.activeIndex
                        const newStartList = Array(
                            self.archiveList.length
                        ).fill(false)
                        newStartList[idx] = true
                        self.startList = newStartList
                    },
                },
            },
            archiveList: getAllYearsInfo(),
            startList: [false, false, false],
        }
    },
    computed: {
        nextDisabled() {
            console.log('nextDisabled', this.$refs?.swiperRef?.$swiper)
            return this.$refs?.swiperRef?.$swiper?.isEnd
        },
    },

    mounted() {
        setTimeout(() => {
            const hashYear = this.$route.hash?.slice(1)
            if (hashYear) {
                const index = this.archiveList.findIndex(
                    (item) => item.year === +hashYear
                )
                this.$refs?.swiperRef?.$swiper?.slideTo(index)
            }
        }, 100)
        $(window).on('resize', this.updateWrapperH)
        this.wrapperH = window.innerHeight - this.$getNavH()
        this.updateWrapperH()
    },
    destroyed() {
        $(window).off('resize', this.updateWrapperH)
    },
    methods: {
        updateWrapperH() {
            if (process.client)
                this.wrapperH = window.innerHeight - this.$getNavH()
        },
        slidePrev() {
            this?.$refs?.swiperRef?.$swiper?.slidePrev()
        },
        slideNext() {
            this?.$refs?.swiperRef?.$swiper?.slideNext()
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
