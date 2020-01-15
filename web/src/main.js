import Vue from 'vue'
import App from './App.vue'
import './style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require swiper styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
