import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      { path: '/categories/list',component: CategoryList},
    ]

  }]
})