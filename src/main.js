import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import '../node_modules/mint-ui/lib/style.css'
import Routes from './router/router-config.js'
import VueRouter from 'vue-router'
import {Rate} from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import Store from './store/store.js'
const router=new VueRouter(Routes);
Vue.use(Mint);
Vue.use(Rate);
Vue.use(VueRouter);
import '../node_modules/animate.css/animate.css'
new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
  store:Store 
})
