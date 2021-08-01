<template>
    <modal :name="modalName"
           :ref="modalName"
           :adaptive="true"
           height="auto"
           :scrollable="true"
           :classes="classes"
           @opened="opened"
           @closed="closed"
           v-bind="$attrs"
           v-on="$listeners"
    >
        <slot></slot>
    </modal>
</template>

<script>
    import {v4 as uuidv4} from 'uuid'
    export default {
        name: "CommonModal",
        props: {
            show: Boolean,
            name: String,
            classes: {
                type: String,
                default: 'v--modal'
            }
        },
        model: {
            prop: 'show',
            event: 'input'
        },
        computed:{
            modalName:function(){
                return this.name+this.uuid
            }
        },
        watch:{
            newShow(newV,oldV){
                console.log(newV,oldV)
                if(newV){
                    this.$modal.show(this.modalName)
                }else{
                    this.$modal.hide(this.modalName)
                }
                this.$emit('input',newV)
            },
            show(newV){
                if(newV===this.newShow)return
                this.newShow=newV
            }
        },
        data(){
            return {
                uuid:uuidv4(),
                newShow:this.show
            }
        },
        mounted(){
            this.appendInBody()
        },
        methods: {
            appendInBody() {
                document.getElementById('taskInfoModalWrap').appendChild(this.$refs[this.modalName].$el)
            },
            opened(){
                this.$emit('opened')
            },
            closed(){
                this.$emit('closed')
                this.newShow=false
            }
        }
    }
</script>

<style scoped>

</style>
