
<template>
    <ValinePageview :uniqStr="uniqStr"  />
</template>

<script>
    import {ValinePageview} from "../../../utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    export default {
        name: "PageViewVue",
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
        components:{
            ValinePageview:applyReactInVue(ValinePageview),
        }
    }
</script>

<style scoped>

</style>
