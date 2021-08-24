<template>
    <section style="height:100vh;padding-right:17px;" class="w-100 blur-transition blur-10 accord-wrapper" ref="blur-loading" :style="{marginTop:- $state.getNavH() + 'px'}">
        <div class="skew-box color-1"></div>
        <div class="skew-box color-2"></div>
        <div class="skew-box color-3"></div>
    </section>
</template>

<script>
    export default {
        name: "HomepageLoading",
        mounted(){
            $(document).ready(()=>{
                console.log(this.$refs['blur-loading'].className)
                this.$refs['blur-loading'].className+=' blur-1'
            })

        }
    }
</script>

<style scoped>

    .blur-10{
        filter:blur(100px)
    }
    .blur-1{
        transition:all 1s;
        filter:blur(1px) ;
    }
</style>
