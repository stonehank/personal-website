<template>
    <section
        class="d-flex justify-start align-center timeline-wrapper"
        :style="`height:${wrapperH}px`"
    >
        <div v-if="$vuetify.breakpoint.mdAndUp" class="timeline-left">
            <ArchiveYearInfo :archive-data="archiveData" :start="start" />
        </div>
        <div class="timeline-axis">
            <div class="timeline-dot"></div>
            <div class="timeline-line"></div>
        </div>
        <div class="timeline-right d-flex flex-column pb-4" style="flex: 1">
            <div v-if="$vuetify.breakpoint.smAndDown" class="w-100">
                <ArchiveYearInfo :archive-data="archiveData" :start="start" />
            </div>
            <ArchiveMonthCard
                :counts="archiveData.month_counts"
                :year="archiveData.year"
                :start="start"
            />
        </div>
    </section>
</template>

<script>
export default {
    props: {
        archiveData: Object,
        start: Boolean,
    },
    data() {
        return {
            wrapperH: 0,
        }
    },
    created() {
        this.updateWrapperH()
    },
    mounted() {
        $(window).on('resize', this.updateWrapperH)
    },
    destroyed() {
        $(window).off('resize', this.updateWrapperH)
    },
    methods: {
        updateWrapperH() {
            this.wrapperH = window.innerHeight - this.$state.getNavH()
        },
    },
}
</script>

<style scoped lang="scss">
.timeline-wrapper {
    .timeline-left {
        width: 350px;
        height: 100%;
    }
    .timeline-right {
        height: 100%;
    }
    .timeline-axis {
        height: 100%;
        width: 42px;
        position: relative;
        .timeline-dot {
            width: 24px;
            height: 24px;
            background: var(--theme-primary);
            position: absolute;
            left: 50%;
            top: 16px;
            z-index: 2;
            transform: translateX(-50%);
            border-radius: 50%;
        }
        .timeline-line {
            height: 130%;
            width: 2px;
            background: var(--border-color);
            position: absolute;
            left: 50%;
            top: 0;
            z-index: 0;
            transform: translateX(-50%);
        }
    }
}
</style>
