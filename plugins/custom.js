import Vue from 'vue'
import $ from 'jquery'

window.$ = $
window.jquery = $
Vue.prototype.$state = {
  getNavH: () => {
    const $nav = $('#nav-header')
    return $nav.length > 0 ? $nav.outerHeight() : (this.$vuetify.breakpoint.smAndDown ? 56 : 64)
  },
  add: function (key, value) {
    Vue.prototype.$state[key] = value
  }
}
Vue.mixin({
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
})