# vue--node-mongodb-wzry
vue + node (Express + ElementUI) +mongodb全栈开发王者荣耀手机端官网和管理后台
## 一、 准备
1. 工具安装和环境搭建(nodejs,npm,mongodb)
1. 初始化项目（通过vue-cli3创建两个vue项目（admin和web））；server数据接口安装express框架


## 二、 管理后台
1. 基于Element UI的后台管理基础界面搭建
#### 后台管理系统主要有以下功能：
1. 分类管理（无限级数）
1. 装备管理
1. 英雄管理
1. 文章管理（其中编辑器使用的是富文本编辑器 (vue2-editor)）
1. 首页广告管理
1. 管理员账号管理 (bcrypt)
1. 图片上传 (multer)
1. 登录模块使用接口 (jwt,jsonwebtoken)进行服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

1. **ps：所有增删改查均使用通用 CRUD 接口；**
         **上面所有用到的相关插件都需要手动安装；**



## 三、移动端网站

1. 使用SASS (SCSS)进行base样式定义（网站常用色彩、字体和边距定义 (colors, font,margin,padding)；
1. 页面整体框架使用flex布局

1. 首页顶部轮播图使用的是‘vue swiper’插件
1. 项目中一部分图标是扣取官方精灵图片 (sprite)，剩余部分使用字体图标 (阿里巴巴iconfont)
1. 考虑到组件复用性，实现了卡片组件 (card)和列表卡片组件 (list-card, nav, swiper)，几乎可以用到除详情页外的所有布局，方便快捷

#### 总体实现了以下功能：

1. 首页新闻资讯及详情展示
1. 首页英雄列表及详情展示
1. 精彩视频列表及详情展示

## 四、发布和部署 (阿里云)

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. MongoDB数据库的安装和配置
1. git 安装、配置ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装pm2并启动项目
1. 配置 Nginx 的反向代理
1. 迁移本地数据到服务器 (mongodump)