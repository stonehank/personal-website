<template>
    <VueValinePanel :uniqStr="uniqStr"  />
</template>

<script>
    import { VueValinePanel} from "./ReactToVue"
    export default {
        name: "PanelVue",
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
        components:{
            VueValinePanel,
        }
    }
</script>

<style scoped>

</style>
