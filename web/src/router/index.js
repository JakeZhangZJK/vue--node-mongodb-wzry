import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Article = () => import('views/home/Article')
const Hero = () => import('views/home/Hero')

const Strategy = () => import('views/strategy/Strategy')
const MoreStrategies = () => import('views/strategy/childViews/MoreStrategies')

const Race = () => import('views/race/Race')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { keepAlive: true }
  },
  {
    path: '/article/:id',
    component: Article,
    props: true,
    meta: { keepAlive: false }
  },
  {
    path: '/hero/:id',
    component: Hero,
    props: true,
    meta: { keepAlive: false }
  },
  {
    path: '/strategy',
    component: Strategy
  },
  {
    path: '/more_strategies',
    component: MoreStrategies
  },
  {
    path: '/race',
    component: Race
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router