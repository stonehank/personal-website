<template>
    <ValinePanel :uniqStr="uniqStr"  />
</template>

<script>
    import { ValinePanel} from "../../../utils/react-valine/react-valine.js"
    import {applyReactInVue} from 'vuereact-combined'
    export default {
        name: "PanelVue",
        props:{
            uniqStr:{
                type:String,
                default:decodeURI(window.location.origin+window.location.pathname)
            }
        },
        components:{
            ValinePanel:applyReactInVue(ValinePanel),
        }
    }
</script>

<style scoped>

</style>
