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
        return $('#nav-header').outerHeight()
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
