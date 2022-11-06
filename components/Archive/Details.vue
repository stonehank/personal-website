<template>
    <section
        class="d-flex justify-start align-center timeline-wrapper"
        :style="`height:100%`"
    >
        <div v-if="$vuetify.breakpoint.mdAndUp" class="timeline-left">
            <ArchiveYearInfo :archive-data="archiveData" :start="start" />
        </div>
        <div class="timeline-axis">
            <div class="timeline-dot"></div>
            <div class="timeline-line"></div>
        </div>
        <div class="timeline-right d-flex flex-column" style="flex: 1">
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
    },
}
</script>

<style scoped lang="scss">
.timeline-wrapper {
    .timeline-left {
        width: 300px;
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
