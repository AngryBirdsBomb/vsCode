import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import '../node_modules/mint-ui/lib/style.css'
import Routes from './router/router-config.js'
import VueRouter from 'vue-router'

const router=new VueRouter(Routes);
Vue.use(Mint);
Vue.use(VueRouter);
new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
