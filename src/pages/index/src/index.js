import 'logicDir/common.default-layout.js'
import './style.scss'
import vuetify from "./vuetify"
import Routes from "./router"
import App from "./App"
import Vue from 'vue'
import VueRouter from 'vue-router'
import vModal from 'vue-js-modal'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import bbsReg from 'vue-bbs/dist/register'
// import VueBBS from 'vue-bbs'
// import bbsReg from './utils/vue-bbs/register'

bbsReg(Vue,{
    appId:"6PqQxaHNKFRo3zNn0gvacAPe-MdYXbMMI",
    appKey:"Tch5BpC3rniA0yFjrw6xlxdj",
    serverURLs:"6pqqxahn.api.lncldglobal.com",
    CommentClass:"Comments",
    CounterClass:"Counters",
})
Vue.use(preview)
Vue.use(PerfectScrollbar)
Vue.use(vModal)
Vue.use(VueRouter)

Vue.mixin({
    computed:{
        isMobile:function(){
            return this.$vuetify.breakpoint.smAndDown
        }
    }
})

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        ...savedPosition,
                        behavior:'instant'
                    })
                }, 0)
            })
        }
    }
})

Vue.prototype.$state = {
    getNavH: function () {
        let $nav=$('#nav-header')
        return $nav.length>0 ? $nav.outerHeight() : (vm.$vuetify.breakpoint.smAndDown ? 56 : 64)
    },
    add:function(key,value){
        Vue.prototype.$state[key]=value
    }
}


window.router = router
let vm = new Vue({
    vuetify: vuetify,
    el: '#app',
    router: router,
    render: h => h(App)
})
window.vm = vm
window.jquery = $

export default vm
