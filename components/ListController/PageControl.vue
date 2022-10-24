<template>
    <v-pagination
        v-model="curPage"
        prev-icon="fas fa-angle-left"
        next-icon="fas fa-angle-right"
        :total-visible="7"
        :length="Math.ceil(allLength / perPage)"
        @input="onChange"
    ></v-pagination>
</template>

<script>
export default {
    name: 'PageControl',
    props: {
        allLength: Number,
        perPage: Number,
        page: [Number, String],
        updateSelected: Function,
    },
    data() {
        return {
            curPage: 1,
        }
    },
    watch: {
        '$route.query.page': {
            immediate: true,
            handler(newV) {
                if (!newV) return
                this.curPage = +newV
                this.updateSelected(+newV)
            },
        },
    },
    methods: {
        onChange(selectedPage) {
            if (+this.page === selectedPage) return
            this.updateSelected(selectedPage)
            if (this.$route.query.page !== selectedPage)
                this.$router.push({ query: { page: selectedPage } })
        },
    },
}
</script>

<style scoped></style>
