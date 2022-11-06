<template>
    <v-container fluid>
        <v-row>
            <v-col
                cols="12"
                class="pb-0"
                :class="$getIsMobile() ? 'text-center' : 'text-right'"
            >
                <router-link :to="'/blogs/archive#' + archiveData.year">
                    <h2 :class="$getIsMobile() ? 'display-2' : 'display-3'">
                        {{ archiveData.year }}
                    </h2>
                </router-link>
            </v-col>
            <v-col cols="12" :class="$getIsMobile() ? 'text-center' : 'text-right'">
                <p
                    ref="year-info-1"
                    class="mb-0"
                    :class="$getIsMobile() ? 'text-md' : 'text-lg'"
                    :style="animate ? 'opacity:0;' : ''"
                >
                    共完成
                    <AnimateGrowNumber
                        :class="$getIsMobile() ? 'text-lg' : 'display-1'"
                        :final-num="archiveData.blog_count"
                        :start="start"
                        :animate="animate"
                    />
                    篇
                </p>
                <!-- <p
                    ref="year-info-2"
                    class="text-secondary"
                    :class="$getIsMobile() ? 'text-md' : 'text-lg'"
                    :style="animate ? 'opacity:0;' : ''"
                >
                    总共阅读次数
                    <AnimateGrowNumber
                        :class="$getIsMobile() ? 'text-lg' : 'display-1'"
                        :final-num="archiveData.view_count"
                        :shrink="archiveData.view_count > 99999"
                        :start="start"
                        :animate="animate"
                    />
                </p> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import anime from 'animejs'
export default {
    props: {
        archiveData: {
            type: Object,
            default: () => ({
                view_count: 0,
                blog_count: 0,
                year: new Date().year(),
                month_counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }),
        },
        start: Boolean,
        animate: {
            type: Boolean,
            default: true,
        },
    },
    watch: {
        start: {
            immediate: true,
            handler(newV) {
                if (!this.animate) return
                if (newV) {
                    anime({
                        targets: this.$refs['year-info-1'],
                        opacity: 1,
                        easing: 'linear',
                        duration: 400,
                    })
                    anime({
                        targets: this.$refs['year-info-2'],
                        opacity: 1,
                        easing: 'linear',
                        duration: 400,
                        delay: 200,
                    })
                } else {
                    anime.remove(this.$refs['year-info-1'])
                    anime.remove(this.$refs['year-info-2'])
                    $(this.$refs['year-info-1']).css({
                        opacity: 0,
                    })
                    $(this.$refs['year-info-2']).css({
                        opacity: 0,
                    })
                }
            },
        },
    },
}
</script>

<style scoped></style>
