import 'logicDir/common.default-layout.js'
import './style.scss'
import vuetify from "./vuetify"
import Routes from "./router"
import App from "./App"
import Vue from 'vue'
import VueRouter from 'vue-router'
import vModal from 'vue-js-modal'
// import { VuePlugin } from 'vuera'


// window.Vue=Vue
Vue.use(vModal)
Vue.use(VueRouter)

// Vue.use(VuePlugin)

const router = new VueRouter({
    routes: Routes,
    mode:'history'
})

Vue.prototype.$custom_data={
    getNavH:function(){
        return $('#nav-header').outerHeight()
    }
}

window.router=router
let vm= new Vue({
    vuetify:vuetify,
    el: '#app',
    router:router,
    render: h => h(App)
})
window.vm=vm
window.jquery=$

export default vm
