<template>
    <div class="d-flex flex-column flex-sm-row justify-start align-center">
        <OrderControl
            :selected="selectedData"
            :update-selected="updateOrderSelected"
        />
        <PageControl
            :page="selectedData.page"
            :all-length="allLength"
            :per-page="perPage"
            :update-selected="updatePageSelected"
        />
    </div>
</template>

<script>
import OrderControl from './OrderControl'
import PageControl from './PageControl'
export default {
    name: 'ListController',
    components: { PageControl, OrderControl },
    model: {
        prop: 'selected',
        event: 'change',
    },
    props: {
        selected: Object,
        allLength: Number,
        perPage: Number,
    },
    data() {
        return {
            selectedData: this.selected,
        }
    },
    watch: {
        selected(newV) {
            this.selectedData = newV
        },
        selectedData: {
            deep: true,
            handler(newV) {
                this.$emit('change', newV)
            },
        },
    },
    methods: {
        updateOrderSelected(order, type) {
            this.selectedData.order = order
            this.selectedData.type = type
        },
        updatePageSelected(selectedPage) {
            this.selectedData.page = selectedPage
        },
    },
}
</script>

<style scoped></style>
