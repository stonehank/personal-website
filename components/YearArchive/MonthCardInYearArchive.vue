<template>
    <v-container fluid class="h-100">
        <v-row class="h-100">
            <v-col
                v-for="(percent, index) in percentH"
                :key="index"
                cols="4"
                md="3"
            >
                <div ref="month-card" class="h-100" style="opacity: 0">
                    <v-card
                        :to="`/archive/${year}-${index + 1}`"
                        class="h-100 position-relative d-flex justify-center align-center count-box"
                    >
                        <h4 class="month-count-text text-lg">
                            {{ index + 1 }} 月
                        </h4>
                        <AutoGrowLine
                            :final-height="percent"
                            :start="start"
                            class="month-count-line"
                            :style="`background:${bgColors[index]}`"
                        />
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import anime from 'animejs'
import AutoGrowLine from './AutoGrowLine'
export default {
    name: 'MonthCardInYearArchive',
    components: { AutoGrowLine },
    props: {
        year: Number,
        counts: Array,
        start: Boolean,
    },
    computed: {
        percentH: function () {
            const max = Math.max.apply(Math, this.counts)
            return this.counts.map((count) => (count / max) * 100)
        },
        bgColors: function () {
            const colors = [
                '#caffb1',
                '#9fff90',
                '#6ffc6f',
                '#48db5c',
                '#24d648',
                '#02c215',
            ]
            const max = Math.max.apply(Math, this.counts)
            return this.counts.map((count) => {
                const p = count / max
                const len = colors.length
                for (let i = len - 1; i >= 0; i--) {
                    if (p >= i / len) return colors[i]
                }
                return colors[0]
            })
        },
    },
    watch: {
        start: {
            immediate: true,
            handler(newV) {
                if (newV) {
                    anime({
                        targets: this.$refs['month-card'],
                        opacity: 1,
                        easing: 'easeOutCirc',
                        delay: function (eles, idx) {
                            return idx * 100
                        },
                    })
                } else {
                    anime.remove(this.$refs['month-card'])
                    $(this.$refs['month-card']).css({
                        opacity: 0,
                    })
                }
            },
        },
    },
}
</script>

<style scoped>
.month-count-line {
    border-radius: 8px 8px 0 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
.month-count-text {
    position: relative;
    z-index: 1;
    color: var(--text-secondary);
}
.count-box {
    border-radius: 8px 8px 0 0;
    background: var(--foreground-color);
}
</style>
