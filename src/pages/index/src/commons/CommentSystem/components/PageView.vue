
<template>
    <VueValinePageview :uniqStr="uniqStr"  />
</template>

<script>
    import {VueValinePageview} from './ReactToVue'
    export default {
        name: "PageViewVue",
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
        components:{
            VueValinePageview,
        }
    }
</script>

<style scoped>

</style>
