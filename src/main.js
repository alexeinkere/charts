import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
import VueRouter from 'vue-router'

import Routes from './routes.js'
import './assets/index.css'
import installElement from "./plugins/element/installElement.js";

Vue.use(GAuth, {
  clientId:
    "100330478767-9b58gcgt5gtjaupgathlemudlm5dfmg0.apps.googleusercontent.com",
  scope: "email",
  prompt: "select_account",
  fetch_basic_profile: false
});

Vue.use(installElement);
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
})