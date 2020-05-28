# 简介
vue--node-mongodb-wzry是一个移动端的仿王者荣耀手机端官网和后台管理系统的全栈开源项目，基于 vue + node (Express + ElementUI) +mongodb实现。本项目使用了最新的Vue全家桶技术栈，后台数据通过node+mongodb搭建。

## 一、 环境准备
1. 工具安装和环境搭建(nodejs,npm,mongodb)

## 二、 项目启动
### 1、star本仓库并克隆项目到本地

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
分别在admin和web目录下运行上面的命令，打包后的静态文件分别存放于server目录下的admin和web文件夹下，

![](https://user-gold-cdn.xitu.io/2020/5/28/17259c11896ebea3?w=357&h=609&f=png&s=25836)


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
1. 本地图片上传 (multer)和视频上传
1. 列表分页功能及模糊查询
1. 登录模块使用接口 (jwt,jsonwebtoken)进行服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

**ps：所有增删改查均使用通用 CRUD 接口；通过中间件匹配前端传过来路由进行相应的增删改查**


**路由匹配中间件**
```
module.exports = () => { 
    return async (req, res, next) => { // 模型匹配中间件  // “resource”为动态参数，用来匹配相应资源
        const modelName = require('inflection').classify(req.params.resource) // 请求动态资源  这里需要安装一个inflection依赖包，用于类名转换
        req.Model = require(`../models/${modelName}`)
        next()
      }
}
```
```js
// 引入资源匹配中间件
  const resourceMiddleWare = require('../../middleware/resource.js')
 // 通用新增接口
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 通用修改接口
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 通用删除接口
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 通用获取列表接口
  router.get('/', async (req, res) => {
    const queryOptions = {}
    let pageNum = req.query.pageNum;
    let pageSize = req.query.pageSize;
    let count = await req.Model.find().count() // 总条数
    let items = ''
    let obj = ''
    // 为了通用性，这里不单独写Category的接口，因为Category要特殊获取上级分类，
    // 所以这里将它设置为动态参数传进去，以后类似的特殊请求都可以这样处理
    if (req.Model.modelName === 'Category' || req.Model.modelName === 'Model') {
      queryOptions.populate = 'parent'
    }
    if (pageNum) {
      items = await req.Model.find()
        .setOptions(queryOptions)
        .skip(parseInt(pageSize) * parseInt(pageNum - 1))
        .limit(parseInt(pageSize));
      obj = {
        count,
        items
      }
    } else {
      obj = await req.Model.find().setOptions(queryOptions).limit(count)
    }
    res.send(obj)
  })
  // 通用获取一条数据接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

```



## 四、移动端网站

1. 使用SASS (SCSS)进行base样式预定义（网站常用色彩、字体和边距定义 (colors, font,margin,padding)；
1. 页面整体框架使用flex布局
1. 首页顶部轮播图使用的是‘vue swiper’插件
1. 项目中一部分图标是扣取官方精灵图片 (sprite)，剩余部分使用字体图标 (阿里巴巴iconfont)
1. 考虑到组件复用性，实现了通用列表卡片组件 (list-card, swiper)、英雄攻略列表组件（guide-list-card）和赛事中心列表（mt-card）组件，几乎可以用于除详情页外的所有布局，方便快捷

#### 总体实现了三大模块：
**首页**
1. 首页新闻资讯及详情页展示
1. 首页英雄列表及详情页展示
1. 首页图文攻略列表及详情页展示
1. 首页精彩视频列表及视频播放

**攻略中心**
1. 攻略中心（英雄攻略、精品栏目、赛事精品、精彩视频和图文攻略5个小模块）及详情页展示和视频播放

**赛事中心**
1. 赛事列表及详情页图文展示

## 页面GIF和部分截图
![](https://user-gold-cdn.xitu.io/2020/5/28/17259757827e697d?w=398&h=707&f=gif&s=4134118)



![](https://user-gold-cdn.xitu.io/2020/5/28/1725985c1145159a?w=398&h=707&f=gif&s=4164999)

![](https://user-gold-cdn.xitu.io/2020/5/28/172597ca420d3592?w=398&h=707&f=gif&s=3631507)

![](https://user-gold-cdn.xitu.io/2020/5/28/17259810b481b8d6?w=398&h=707&f=gif&s=3335867)

![](https://user-gold-cdn.xitu.io/2020/5/28/17259aa27b8376c2?w=1893&h=837&f=gif&s=4270188)





![](https://user-gold-cdn.xitu.io/2020/5/28/17259b0ef42fdec0?w=1893&h=879&f=gif&s=2046522)

#### 后台管理
![](https://user-gold-cdn.xitu.io/2020/5/28/1725994d18ac2079?w=1910&h=899&f=png&s=92563)

![](https://user-gold-cdn.xitu.io/2020/5/28/172599cf658718da?w=1920&h=1062&f=png&s=237768)


![](https://user-gold-cdn.xitu.io/2020/5/28/17259b3459677903?w=1896&h=893&f=png&s=91931)


![](https://user-gold-cdn.xitu.io/2020/5/28/17259b560dfa76db?w=1899&h=909&f=png&s=241999)

![](https://user-gold-cdn.xitu.io/2020/5/28/17259b7436a2b11d?w=1902&h=903&f=png&s=387833)

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