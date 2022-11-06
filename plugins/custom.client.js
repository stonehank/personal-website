import Vue from 'vue'
import $ from 'jquery'
window.$ = $
window.jquery = $

Vue.prototype.$state = {
  add: function (key, value) {
    Vue.prototype.$state[key] = value
  }
}

