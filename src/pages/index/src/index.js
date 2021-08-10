import 'logicDir/common.default-layout.js'
import './style.scss'
import vuetify from "./vuetify"
import Routes from "./router"
import App from "./App"
import Vue from 'vue'
import VueRouter from 'vue-router'
import vModal from 'vue-js-modal'


Vue.use(vModal)
Vue.use(VueRouter)


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

Vue.prototype.$custom_data = {
    getNavH: function () {
        return $('#nav-header').outerHeight()
    },

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
