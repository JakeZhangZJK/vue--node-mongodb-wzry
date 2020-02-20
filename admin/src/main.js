/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/avue.js'
import router from './router'
import './style.css'
import http from './http'

// 导入富文本编辑器
 import { VueEditor} from "vue2-editor";
Vue.use(VueEditor)

Vue.config.productionTip = false


Vue.prototype.$http = http

Vue.mixin({
  computed: {
    upLoadUrl() { 
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
     }

  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')