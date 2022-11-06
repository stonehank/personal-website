// import bbsReg from 'vue-bbs/dist/register'
// import Vue from 'vue'
// bbsReg(Vue, {
//   appId: "6PqQxaHNKFRo3zNn0gvacAPe-MdYXbMMI",
//   appKey: "Tch5BpC3rniA0yFjrw6xlxdj",
//   serverURLs: "6pqqxahn.api.lncldglobal.com",
//   CommentClass: "Comments",
//   CounterClass: "Counters",
// })

import Vue from 'vue'
import bbs from 'vue-bbs'

Vue.use(bbs, {
  appId: "6PqQxaHNKFRo3zNn0gvacAPe-MdYXbMMI",
  appKey: "Tch5BpC3rniA0yFjrw6xlxdj",
  serverURLs: "6pqqxahn.api.lncldglobal.com",
  CommentClass: "Comments",
  CounterClass: "Counters",
})