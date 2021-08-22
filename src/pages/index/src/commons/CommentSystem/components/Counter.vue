
<template>
    <ValineCount :uniqStr="uniqStr"  />
</template>

<script>
    import {ValineCount} from "../../../utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    export default {
        name: "CounterVue",
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
        components:{
            ValineCount:applyReactInVue(ValineCount),
        }
    }
</script>

<style scoped>

</style>
