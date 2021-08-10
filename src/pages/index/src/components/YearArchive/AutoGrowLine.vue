<template>
    <div :style="`height:${height}%`"></div>
</template>

<script>
    import anime from 'animejs'
    export default {
        name: "AutoGrowLine",
        props:{
            finalHeight:Number,
            startFrom:{
                default:0
            },
            start:Boolean
        },
        watch:{
            start:{
                immediate:true,
                handler(newV){
                    if(newV){
                        this.animeNumber(this.finalHeight)
                    }else{
                        this.height=this.startFrom
                    }
                }
            }
        },
        data(){
            return {
                height:this.startFrom
            }
        },
        methods:{
            animeNumber(to,  tofixed = 0) {
                let obj = {
                    val: this.height,
                }
                let self = this
                anime({
                    targets: obj,
                    val: to,
                    easing: 'easeOutCirc',
                    duration: 800,
                    update() {
                        if(!self.start)return
                        self.height=parseFloat(obj.val.toFixed(tofixed))
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
