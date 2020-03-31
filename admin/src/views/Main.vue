<!---->
<template>
  <el-container class="main-container">
    <el-header>
      <div>
        <img src="../assets/images/logo1.png" alt="">
        <span>王者荣耀官网后台管理系统</span>
      </div>
      <el-button type="text" size="middle" style="color:grey"> <i class="el-icon-switch-button"></i> 退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollpase ? '52px':'199px'" style="background-color:#545c64;overflow:hidden">
        <div class="toggle-btn" @click="toggleCollpase">
          <i class="el-icon-d-arrow-left" v-if="!isCollpase"></i>
        <i class="el-icon-d-arrow-right" v-if="isCollpase"></i>
        </div>
         <!-- 默认展开第一个，一次只能展开一个，被点击的高亮 -->
        <el-menu :collapse-transition="false"  router  unique-opened :collapse="isCollpase" :default-active="activePath" 
          background-color="#545c64" text-color="#fff" active-text-color="#fdb933">
          <el-submenu :index="menu.index" v-for="(menu,i) in menus" :key="i">
            <template slot="title"><i :class="menu.icon" style="margin-right:8px"></i>{{menu.name}}</template>
                <el-menu-item  v-for="(item,i) in menu.children" :key="i" :index="item.router" @click="saveNavState(item.router)"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      
      <el-main class="mian-right">
        <router-view></router-view>
      </el-main>
     
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        isCollpase:false,//是否折叠菜单
        activePath:'',
        menus:[
          {
            name:'内容管理',
            icon:'el-icon-message',
            index:'1',
            children:[
              {
                name:'分类管理',
                icon:'el-icon-menu',
                router:'/categories/list'
              },
               {
                name:'英雄管理',
                icon:'el-icon-menu',
                router:'/heroes/list'
              },
              {
                name:'装备管理',
                icon:'el-icon-menu',
                router:'/items/list'
              },
              //   {
              //   name:'铭文管理',
              //   icon:'el-icon-menu',
              //   router:''
              // },
              //   {
              //   name:'召唤师技能',
              //   icon:'el-icon-menu',
              //   router:'categories'
              // },
            ]
          },
             {
            name:'运营管理',
            icon:'el-icon-s-platform',
            index:'2',
            children:[
              {
                name:'广告管理',
                icon:'el-icon-menu',
                router:'/ads/list'
              },
              {
                name:'文章管理',
                icon:'el-icon-menu',
                router:'/articles/list'
              },
                {
                name:'视频管理',
                icon:'el-icon-menu',
                router:'/videos/list'
              },
                {
                name:'图文攻略',
                icon:'el-icon-menu',
                router:'/guides/list'
              }
            ]
          },
             {
            name:'系统设置',
            icon:'el-icon-setting',
            index:'3',
            children:[
              {
                name:'管理员',
                icon:'el-icon-menu',
                router:'/admin_users/list'
              },
            ]
          },
        ]
      }
    },
    methods: {
      toggleCollpase(){
        this.isCollpase = !this.isCollpase;
      },
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath
      }
    },
    created(){
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  }
</script>
<style  scoped>
.main-container{
  height: 100vh;
   
}
.mian-right{
  overflow-y: auto;
}
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #eaedf1;
  font-size: 20px;
}
.el-header div{
display: flex;
align-items: center;
}
.el-header div span{
margin-left: 10px;
}
.el-menu{
  border-right: 0;
}
.toggle-btn{
  background-color: #545c64;
  font-size:12px;
  line-height: 24px;
  color: #fff;
  text-align: right;
  cursor: pointer;
}
.toggle-btn i{
 margin-right: 10%;
}
.el-main{
  background-color: #eaedf1;
}
</style>