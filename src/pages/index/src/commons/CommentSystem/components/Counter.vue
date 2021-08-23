
<template>
    <VueValineCount :uniqStr="uniqStr"  />
</template>

<script>
    import {VueValineCount} from "./ReactToVue"
    export default {
        name: "CounterVue",
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
        components:{
            VueValineCount,
        }
    }
</script>

<style scoped>

</style>
