<template>
    <div class="d-flex align-center" :style="$vuetify.breakpoint.xsOnly ? '' : 'max-width:280px'">
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
        computed:{
            typeList:function(){
                if(this.selectedOrder==='created_at'){
                    return [
                        {text:'从新到旧',value:'desc',},
                        {text:'从旧到新',value:'asc',}
                    ]
                }else{
                    return [
                        {text:'从多到少',value:'desc',},
                        {text:'从少到多',value:'asc',}
                    ]
                }
            }
        },
        data(){
            return {
                selectedOrder:this.selected.order || 'created_at',
                selectedType:this.selected.type || 'desc',
                orderList:[
                    {text:'时间',value:'created_at',},
                    {text:'标签数量',value:'relatedTags',},
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
