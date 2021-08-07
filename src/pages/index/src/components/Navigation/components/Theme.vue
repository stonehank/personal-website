<template>
    <v-switch
            v-if="$vuetify.breakpoint.smAndDown"
            v-model="isDarkActive"
            inset
            hide-details
            color="#000"
    >
    </v-switch>
    <v-tooltip bottom v-else>
        <template v-slot:activator="{ on, attrs }">
            <div
                    v-bind="attrs"
                    v-on="on"
            >
                <v-switch
                        v-model="isDarkActive"
                        inset
                        hide-details
                        color="#000"
                >
                </v-switch>
            </div>
        </template>
        <span>{{isDarkActive ? '暗色模式' : '亮色模式'}}</span>
    </v-tooltip>
</template>

<script>
    import {getTheme, renderThemeOnHTML, setTheme} from "pagesDir/index/src/utils/themeControl";

    export default {
        name: "Theme",
        watch:{
            isDarkActive(newV){
                let bg=newV ? 'dark' : 'light'
                setTheme(bg)
                this.renderTheme(bg)
            }
        },
        mounted(){
            let backgroundColor=getTheme()
            this.isDarkActive=backgroundColor==='dark'
        },
        data(){
            return {
                isDarkActive:false
            }
        },
        methods:{
            renderTheme(backgroundColor){
                this.$vuetify.theme.isDark=backgroundColor==='dark'
                this.$vuetify.theme.applyTheme()
                renderThemeOnHTML(backgroundColor)
            },
        }
    }
</script>

<style scoped>

</style>
