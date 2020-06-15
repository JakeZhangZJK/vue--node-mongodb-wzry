import Vue from 'vue'
import './plugins/element.js'
import App from './App.vue'
import router from './router'

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

import 'nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
