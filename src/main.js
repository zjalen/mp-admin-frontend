// src/main.js

import Vue from 'vue'
import vuetify from './plugins/vuetify' // path to vuetify export
import router from './router'
import store from './store'
import App from './App.vue'
Vue.prototype.$VM = new Vue();
import './utils/guard'

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
