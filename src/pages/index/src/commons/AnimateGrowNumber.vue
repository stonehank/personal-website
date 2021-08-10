<template>
    <span>{{num}}{{shrink ? 'K' : ''}}</span>
</template>

<script>
    import anime from 'animejs'
    export default {
        name: "AnimateGrowNumber",
        props:{
            finalNum:Number,
            shrink:Boolean,
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
                        this.animeNumber(this.finalNum)
                    }else{
                        this.num=this.startFrom
                    }
                }
            }
        },
        data(){
            return {
                num:this.startFrom
            }
        },
        methods:{
            animeNumber(to,  tofixed = 0) {
                let obj = {
                    val: this.num,
                }
                let self = this
                anime({
                    targets: obj,
                    val: to,
                    easing: 'easeOutCirc',
                    duration: to < 5 ? 800 : to < 50 ? 1500 : 2000,
                    update() {
                        if(!self.start)return
                        let curNum = parseFloat(obj.val.toFixed(tofixed))
                        if(self.shrink){
                            curNum = Math.floor(curNum / 1000)
                        }
                        self.num=curNum
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
