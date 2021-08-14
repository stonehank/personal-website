<template>
    <div class="d-flex flex-column flex-sm-row justify-start align-center">
        <OrderControl
                :selected="selectedData"
                :updateSelected="updateOrderSelected"
        />
        <PageControl
                :page="selectedData.page"
                :allLength="allLength"
                :perPage="perPage"
                :updateSelected="updatePageSelected"
        />
    </div>
</template>

<script>
    import OrderControl from "pagesDir/index/src/commons/ListController/OrderControl";
    import PageControl from "pagesDir/index/src/commons/ListController/PageControl";
    export default {
        name: "ListController",
        components: {PageControl, OrderControl},
        props:{
            selected:Object,
            allLength:Number,
            perPage:Number,
        },
        model:{
            prop:'selected',
            event:'change'
        },
        watch:{
            selected(newV){
                this.selectedData=newV
            },
            selectedData:{
                deep:true,
                handler(newV){
                    this.$emit('change',newV)
                }
            }
        },
        data(){
            return {
                selectedData:this.selected
            }
        },
        methods:{
            updateOrderSelected(order,type){
                this.selectedData.order=order
                this.selectedData.type=type
            },
            updatePageSelected(selectedPage){
                this.selectedData.page=selectedPage
            }
        }
    }
</script>

<style scoped>

</style>
