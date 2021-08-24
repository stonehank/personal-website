<template>
    <section style="height:100vh;filter:blur(4px)" class="w-100 accord-wrapper" :style="{marginTop:- $state.getNavH() + 'px'}">
        <div class="skew-box color-1"></div>
        <div class="skew-box color-2"></div>
        <div class="skew-box color-3"></div>
    </section>
</template>

<script>
    export default {
        name: "HomepageLoading"
    }
</script>

<style scoped>

</style>
