import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueProgress from 'vue-progress-path'
import Vuex from 'vuex'

import Routes from './routes.js'
import './assets/index.css'
import store from './store/store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueProgress, {
  defaultShape: 'circle',
})
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
})