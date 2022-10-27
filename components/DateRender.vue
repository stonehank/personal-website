<template>
    <span v-if="type === 'auto'">{{ autoRender }}</span>
    <span v-else-if="type === 'date'">{{
        dateFormat(date, 'YYYY-MM-DD')
    }}</span>
    <span v-else-if="type === 'ago'">{{ timeAgo(date) }}</span>
</template>

<script>
import { dateFormat, timeAgo, dayGapMoreThan } from 'utils/date/date-format'
export default {
    name: 'DateRender',
    props: {
        date: String,
        type: {
            default: 'auto',
            validator: (value) => ['ago', 'date', 'auto'].includes(value),
        },
        autoDaysGap: {
            default: 30,
        },
    },
    computed: {
        dateFormat: () => dateFormat,
        timeAgo: () => timeAgo,
        autoRender: function () {
            if (dayGapMoreThan(this.date, this.autoDaysGap)) {
                return dateFormat(this.date, 'YYYY-MM-DD')
            } else {
                return timeAgo(this.date)
            }
        },
    },
}
</script>

<style scoped></style>
