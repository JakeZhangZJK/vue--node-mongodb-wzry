import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import 'vant/lib/index.css';
import {
  Popup,
  Lazyload,
  Swipe,
  SwipeItem,
  Sticky,
  Tab,
  Tabs
} from 'vant';

Vue.use(Swipe);
Vue.use(Lazyload);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Tab);
Vue.use(Tabs);

//全局注册Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store'
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
