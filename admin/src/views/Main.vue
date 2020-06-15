<template>
  <el-container style="height: 100vh">
    <!-- 头部 -->
    <el-header style="text-align: right; font-size: 12px">
     <div class="logo-title">
        <img src="../assets/img/home/logo1.png" alt="王者荣耀">
        <h2>王者荣耀后台管理系统</h2>
     </div>
      <el-button type="text" size="middle" style="color:grey" @click="loginOut"> <i class="el-icon-switch-button" style="color:#fdb933"></i> 退出</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside width="201px" style="background-color: #252a40">
        <el-menu router :default-active="activePath" unique-opened
        background-color="#252a40" text-color="#fff" active-text-color="#fdb933">
          <!-- 内容管理一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-fold"></i>分类管理
            </template>
            <!-- 内容管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/category">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 物品管理一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>物品管理
            </template>
            <!-- 物品管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/item">物品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 英雄管理一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-help"></i>英雄管理
            </template>
            <!--英雄管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item
                :index="$route.path"
                v-if="$route.path==='/hero/create'||$route.path.indexOf('/hero/edit')!==-1"
              >{{AddOrEdit}}</el-menu-item>
              <el-menu-item index="/hero/list">英雄列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 文章管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>文章管理
            </template>
            <!--文章管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item
                :index="$route.path"
                v-if="$route.path==='/article/create'||$route.path.indexOf('/article/edit')!==-1"
              >{{AddOrEdit}}</el-menu-item>
              <el-menu-item index="/article/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 广告位管理 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>广告位管理
            </template>
            <!--文章管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ad/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 用户管理 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-user"></i>用户管理
            </template>
            <!--用户管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/admin_user/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
    }
  },
  computed: {
    activePath() {
      return this.$route.path
    },
    AddOrEdit() {
      if (this.$route.path.indexOf('/hero') !== -1) {
        if (this.$route.path === '/hero/create') {
          return '添加英雄'
        } else if (this.$route.path.indexOf('/hero/edit') !== -1) {
          return '编辑英雄'
        }
      } else {
        if (this.$route.path === '/article/create') {
          return '添加文章'
        } else if (this.$route.path.indexOf('/article/edit') !== -1) {
          return '编辑文章'
        }
      }

    }
  },
  methods: {
    // 退出登陆
    loginOut() {
      this.$confirm('是否退出当前账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          window.localStorage.clear()
          this.$router.push('/login')
        })
      
    }
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(#11131f, #252a40);
  color: #eee;
}
.logo-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>