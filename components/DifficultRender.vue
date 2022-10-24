<template>
    <span
        :class="{
            'text-success': difficult_num === 1,
            'text-warning': difficult_num === 2,
            'text-error': difficult_num === 3,
        }"
    >
        {{
            difficult_num === 1 ? '简单' : difficult_num === 2 ? '中等' : '困难'
        }}
    </span>
</template>

<script>
export default {
    name: 'DifficultRender',
    props: {
        difficult: [Number, String],
    },
    computed: {
        difficult_num: function () {
            let diff = this.difficult
            if (typeof diff === 'number') {
                return diff
            }
            diff = diff.toLowerCase()
            return diff === 'easy' ? 1 : diff === 'medium' ? 2 : 3
        },
    },
}
</script>

<style scoped></style>
