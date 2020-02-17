import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
// import Login2 from '../views/Login2.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'  
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'    

import VideoEdit from '../views/VideoEdit.vue'
import VideoList from '../views/VideoList.vue'      

import GuideEdit from '../views/GuideEdit.vue'
import GuideList from '../views/GuideList.vue' 




Vue.use(Router)

const router =  new Router({
  routes: [
    // 登录路由
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    // { path: '/login2', name: 'login2', component: Login2, meta: { isPublic: true } },
    {
      
    path: '/',
    name: 'main',
    component: Main,
    children: [
      // 分类子路由
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      { path: '/categories/list', component: CategoryList },
      
      // 装备路由
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      { path: '/items/list',component: ItemList},


      // 英雄路由
      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      { path: '/heroes/list', component: HeroList },

       // 文章路由
       { path: '/articles/create', component: ArticleEdit },
       { path: '/articles/edit/:id', component: ArticleEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      { path: '/articles/list', component: ArticleList },
        // 广告路由
        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
        { path: '/ads/list', component: AdList },
        
       // 管理员路由
       { path: '/admin_users/create', component: AdminUserEdit },
       { path: '/admin_users/edit/:id', component: AdminUserEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
       { path: '/admin_users/list', component: AdminUserList },
       
        // 视频分类路由
        { path: '/Videos/create', component: VideoEdit },
        { path: '/Videos/edit/:id', component: VideoEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
        { path: '/Videos/list', component: VideoList },
        
       // 图文攻略路由R
       { path: '/guides/create', component: GuideEdit },
       { path: '/guides/edit/:id', component: GuideEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
       { path: '/guides/list', component: GuideList },
    ]

  }]
})

//路由守卫
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router