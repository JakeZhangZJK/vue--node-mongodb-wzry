<!---->

<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgba(238, 241, 246)">
        <!-- <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path" v-for="(value,i) in menus" :key="i" >
          <el-submenu :index="value.index">
             <template slot="title"><i class="el-icon-menu"></i>{{value.name}}</template>
            <el-menu-item-group>
              <template slot="title">{{value.tabList.title}}</template>
              <el-menu-item :index="value.tabList.items.router">{{value.tabList.items.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu> -->
        <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
          <!-- 默认展开第一个，一次只能展开一个，被点击的高亮 -->

          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">装备</template>
              <el-menu-item index="/items/create">新建装备</el-menu-item>
              <el-menu-item index="/items/list">装备列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">铭文</template>
              <el-menu-item index="/inscription/create">新建铭文</el-menu-item>
              <el-menu-item index="/inscription/list">铭文列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template slot="title">召唤师技能</template>
              <el-menu-item index="/skills/create">新建技能</el-menu-item>
              <el-menu-item index="/skills/list">技能列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-help"></i>运营管理</template>
            <el-menu-item-group>
              <template slot="title">广告</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">新闻资讯</template>
              <el-menu-item index="/articles/create">新建资讯</el-menu-item>
              <el-menu-item index="/articles/list">资讯列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template slot="title">视频</template>
              <el-menu-item index="/videos/create">新建视频</el-menu-item>
              <el-menu-item index="/videos/list">视频列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template slot="title">攻略</template>
              <el-menu-item index="/guides/create">新建攻略</el-menu-item>
              <el-menu-item index="/guides/list">攻略列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">赛事</template>
              <el-menu-item index="/matches/create">新建赛事</el-menu-item>
              <el-menu-item index="/matches/list">赛事列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-s-tools"></i>系统设置</template>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
         
    <el-tooltip class="item" effect="dark" content="暂未实现" placement="bottom">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu> -->
          </el-dropdown>
           </el-tooltip>
          <span>{{model.username}}</span>
        </el-header>

        <el-main>
           
          <router-view :key="$route.path"></router-view>
         
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
        menus:[
          {
            index:'1',
            name:'内容管理',
            tabList:[
              {
                title:'分类',
                items:[
                  {name:'新建分类',router:'/categories/create'},
                  {name:'分类列表',router:'/categories/list'},
                  ]
              },
              {
                title:'装备',
                items:[
                  {name:'新建装备',router:'/items/create'},
                  {name:'装备列表',router:'/items/list'},
                  ]
              },
              {
                title:'铭文',
                items:[
                  {name:'新建铭文',router:'/inscription/create'},
                  {name:'铭文列表',router:'/inscription/list'},
                ]
              },
              {
                title:'召唤师技能',
                items:[
                  {name:'新建技能',router:'/skills/create'},
                  {name:'技能列表',router:'/skills/list'},
                ]
              },
               {
                title:'英雄',
                items:[
                  {name:'新建英雄',router:'/heroes/create'},
                  {name:'英雄列表',router:'/heroes/list'},
                ]
              },
            ]

          },
            {
            index:'2',
            name:'运营管理',
            tabList:[
              {
                title:'广告',
                items:[
                  {name:'新建广告',router:'/ads/create'},
                  {name:'广告列表',router:'/raiders/list'},
                ]
              },
              {
                title:'新闻资讯',
                items:[
                  {name:'新建资讯',router:'/articles/create'},
                  {name:'资讯列表',router:'/articles/create'},
                ]
              },
              {
                title:'视频',
                items:[
                  {name:'新建视频',router:'/videos/create'},
                  {name:'视频列表',router:'/videos/create'},
                ]
              },
              {
                title:'攻略',
                items:[
                  {name:'新建攻略',router:'/raiders/create'},
                  {name:'攻略列表',router:'/raiders/list'},
                ]
              },
               {
                title:'赛事',
                items:[
                  {name:'新建赛事',router:'/matches/create'},
                  {name:'赛事列表',router:'/matches/list'},
                ]
              },
              
            ]

          },
            {
            index:'3',
            name:'系统设置',
            tabList:[
              {
                title:'管理员',
                items:[
                  {name:'新建管理员',router:'/admin_users/create'},
                  {name:'管理员列表',router:'/admin_users/list'},
                ]
              },
             
            ]

          },

          ],
        model: {
          username: 'jake',
        },
      }
    },
    methods: {
      async login() {
        const res = await this.$http.post('login', this.model)
        // sessionStorage.token = res.data.token
        this.model.username = res.data.user.username;

      },
      created() {
        this.login()

      }
    }
  }
</script>