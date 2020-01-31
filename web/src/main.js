import Vue from 'vue'
import App from './App.vue'
import './myassets/scss/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require swiper styles
import 'swiper/dist/css/swiper.css'
// Introduce font icon
import './myassets/iconfont/iconfont.css'

// Introduce card component
import Card from './components/Card'
Vue.component('m-card', Card)

// Introduce ListCard component
import ListCard from './components/ListCard'
Vue.component('m-list-card',ListCard)

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
