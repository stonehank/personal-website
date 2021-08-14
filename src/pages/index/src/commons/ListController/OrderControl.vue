<template>
    <div class="d-flex align-center" :style="$vuetify.breakpoint.xsOnly ? '' : 'max-width:250px'">
        <v-select
                class="mr-2"
                :items="orderList"
                label="排序类型"
                dense
                hide-details
                v-model="selectedOrder"
                @change="onChange"
                outlined
        ></v-select>
        <v-select
                v-if="selectedOrder"
                :items="typeList"
                v-model="selectedType"
                hide-details
                @change="onChange"
                label="方式"
                dense
                outlined
        ></v-select>
    </div>
</template>

<script>
    export default {
        name: "OrderControl",
        props:{
            selected:Object,
            updateSelected:Function,
        },
        data(){
            return {
                selectedOrder:this.selected.order || 'created_at',
                selectedType:this.selected.type || 'desc',
                orderList:[
                    {text:'时间',value:'created_at',},
                    {text:'阅读量',value:'view_count',},
                    {text:'评论数',value:'comment_count',},
                ],
                typeList:[
                    {text:'从高到低',value:'desc',},
                    {text:'从低到高',value:'asc',}
                ]
            }
        },
        methods:{
            onChange(){
                this.updateSelected(this.selectedOrder,this.selectedType)
            }
        }
    }
</script>

<style scoped>

</style>
