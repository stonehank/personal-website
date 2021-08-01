// Vuetify tree shaking
import Vuetify from "vuetify/lib"
import {getTheme} from "./utils/themeControl"
import Vue from 'vue'


let backgroundColor=getTheme()
let isDark=backgroundColor==='dark'

Vue.use(Vuetify)

export default new Vuetify({
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
                primary: '#005CAF',
                secondary: '#af5300',
                accent: '#82B1FF',
                error: '#b71c1c',
                info: '#2196f3',
                success: '#4caf50',
                warning: '#FFC107',
            },
            dark:{
                primary: '#0056a7',
                secondary: '#a54c00',
                accent: '#82B1FF',
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
