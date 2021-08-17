// Vuetify tree shaking
import Vuetify from "vuetify/lib"
import {getTheme} from "./utils/themeControl"
import Vue from 'vue'


let backgroundColor=getTheme()
let isDark=backgroundColor==='dark'

Vue.use(Vuetify)

let vuetify= new Vuetify({
    treeShake:true,
    breakpoint: {
        thresholds: {
            xs: 600,
            sm: 960,
            md: 1264,
            lg: 1904,
        },
    },
    theme: {
        dark: isDark,
        themes:{
            light:{
                primary: '#2c9ccc',
                secondary: '#cc2c64',
                accent: '#ccb12c',
                error: '#b71c1c',
                info: '#2196f3',
                success: '#4caf50',
                warning: '#FFC107',
            },
            dark:{
                primary: '#45a8d2',
                secondary: '#d44778',
                accent: '#d2b941',
                error: '#cf1d1d',
                info: '#2196f3',
                success: '#54cd58',
                warning: '#FFC107',
            }
        }
    },
    icons:{
        iconfont:'fa',
    }
})
window.vuetify=vuetify
export default vuetify
