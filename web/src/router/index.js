import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Main,
    children: [{
        path: '/',
        name: 'home',
        component: Home
      },
      
    ]
},
   // 视频
   {
    path: '/guides/:id',
    name: 'guide',
    component: () => import( /* webpackChunkName: "about" */ '../views/Guide.vue'),
    props: true
  },
   // 视频
   {
    path: '/videos/:id',
    name: 'video',
    component: () => import( /* webpackChunkName: "about" */ '../views/Video.vue'),
    props: true
  },
  // 英雄
{
  path: '/heroes/:id',
  name: 'hero',
  component:() => import('../views/Hero.vue') ,
  props: true
  },
  // 新闻资讯
  {
    path: '/articles/:id',
    name: 'article',
    component: () => import( /* webpackChunkName: "about" */ '../views/Article.vue'),
    props: true
  },



  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router