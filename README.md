# 简介
vue--node-mongodb-wzry是一个移动端的仿王者荣耀手机端官网和后台管理系统的全栈开源项目，它基于 vue + node (Express + ElementUI) +mongodb实现。参照于Johnny老师的GitHub开源项目（[node-vue-moba]( https://github.com/topfullstack/node-vue-moba)），在这里非常感谢Johnny老师提供的教程，一路下来，从业务流程、编码规范、逻辑思维到新知识的学习，还是学到了许多，我在原有的基础上进行了原有模块完善和扩展了新的模块以及界面美化。本项目使用了最新的Vue全家桶技术栈，后台数据通过node+mongodb搭建。
## 一、 环境准备
1. 工具安装和环境搭建(nodejs,npm,mongodb)

## 二、 项目启动
### 1、克隆项目到本地

```
git clone git@github.com:JakeZhangZJK/vue--node-mongodb-wzry.git
```

### 2、进入项目目录

```
cd vue-node-mongodb-wzry
```

### 3、安装依赖

```
npm install
```

### 4、启动服务

#### （1）admin（后台管理系统）

```
npm run serve
```
#### （2）web 移动端
```
npm run serve
```
#### （3）server 服务端
```
npm run serve
```
#### （4）构建生产环境
```
npm run build
```

## 三、 管理后台
1. 基于Element UI的后台管理基础界面搭建
#### 后台管理系统主要有以下功能：
1. 分类管理（无限级数）
1. 装备管理
1. 英雄管理
1. 文章管理（其中编辑器使用的是富文本编辑器 (vue2-editor)）
1. 视频攻略管理
1. 广告管理
1. 管理员账号管理 (bcrypt)
1. 图片上传 (multer)
1. 列表分页功能及模糊查询
1. 登录模块使用接口 (jwt,jsonwebtoken)进行服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

1. **ps：所有增删改查均使用通用 CRUD 接口；**



## 三、移动端网站

1. 使用SASS (SCSS)进行base样式预定义（网站常用色彩、字体和边距定义 (colors, font,margin,padding)；
1. 页面整体框架使用flex布局
1. 首页顶部轮播图使用的是‘vue swiper’插件
1. 项目中一部分图标是扣取官方精灵图片 (sprite)，剩余部分使用字体图标 (阿里巴巴iconfont)
1. 考虑到组件复用性，实现了通用列表卡片组件 (list-card, swiper)、英雄攻略列表组件（guide-list-card）和赛事中心列表（mt-card）组件，几乎可以用于除详情页外的所有布局，方便快捷

#### 总体实现了三大模块：
1. 1.首页
1. 首页新闻资讯及详情页展示
1. 首页英雄列表及详情页展示
1. 首页图文攻略列表及详情页展示
1. 首页精彩视频列表及视频播放
1. 2.攻略中心
1. 攻略中心（5个小模块）及详情页展示
1. 3.赛事中心
1. 赛事列表及详情页展示
2. 
## 页面部分截图
#### 后台管理

![](https://user-gold-cdn.xitu.io/2020/3/3/1709e800749eb6ec?w=1914&h=915&f=png&s=86686)

![](https://user-gold-cdn.xitu.io/2020/3/3/1709c8a56d6b8de3?w=1896&h=915&f=png&s=201827)

![](https://user-gold-cdn.xitu.io/2020/3/3/1709c8b4a2ade9c5?w=1899&h=914&f=png&s=167743)

![](https://user-gold-cdn.xitu.io/2020/3/3/1709c8c857278311?w=1899&h=911&f=png&s=623036)
![](https://user-gold-cdn.xitu.io/2020/3/4/170a1315ff5812ee?w=1914&h=915&f=png&s=93617)

#### web端
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c8e652a2817a?w=429&h=762&f=png&s=253151)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c8f34ae800f1?w=431&h=761&f=png&s=239362)
![](https://user-gold-cdn.xitu.io/2020/3/4/170a121c536f5006?w=428&h=760&f=png&s=449801)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c963bf587437?w=428&h=765&f=png&s=393922)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c902d5e38520?w=426&h=755&f=png&s=313654)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c91212479b4a?w=426&h=761&f=png&s=640268)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c944e57597ac?w=430&h=766&f=png&s=270453)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c93d5365a421?w=434&h=764&f=png&s=170273)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c91f50055982?w=428&h=757&f=png&s=243510)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c9291c3a2e81?w=426&h=757&f=png&s=533855)
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c96dfc101ee8?w=430&h=762&f=png&s=198204) 
![](https://user-gold-cdn.xitu.io/2020/3/3/1709c982c58670c2?w=431&h=762&f=png&s=47140)


## 免责声明
本项目为仿做项目,仅做练手和学习使用,非官方App,禁止用于商业目的,产生的一切侵权著作法律后果,与本作者无关。

## License

[MIT](https://github.com/JakeZhangZJK/vue--node-mongodb-wzry/blob/master/LICENSE)

Copyright (c) 2020 Jake Zhang