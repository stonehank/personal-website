<template>
    <OrderControl
            :selected="selectedData"
            :updateSelected="updateOrderSelected"
    />
</template>

<script>
    import OrderControl from "pagesDir/index/src/commons/ListController/OrderControl";
    export default {
        name: "ListController",
        components: {OrderControl},
        props:{
            selected:Object,
        },
        model:{
            prop:'selected',
            event:'change'
        },
        watch:{
            selected(newV){
                this.selectedData=newV
            },
            selectedData(newV){
                this.$emit('change',newV)
            }
        },
        data(){
            return {
                selectedData:this.selected
            }
        },
        methods:{
            updateOrderSelected(order,type){
                this.selectedData={
                    order,
                    type
                }
            }
        }
    }
</script>

<style scoped>

</style>
