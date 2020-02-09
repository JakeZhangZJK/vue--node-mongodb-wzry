module.exports = app => {
  const router = require('express').Router()

  const mongoose = require('mongoose')
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')

  //向数据库导入文章数据（前端数据渲染接口另写）
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })

    const cats = await Category.find().where({
      parent: parent
    }).lean() // 获取分类
    const newsTitles = ["元宵福利到 峡谷好热闹！",
      "2月4日全服不停机更新公告",
      "觉醒之战即将再度开启！鬼谷子全屏大，露娜无限连",
      "【已修复】自定义赛事蓝方伤害数值异常问题说明",
      "【已修复】关于部分召唤师点券充值未到账、点券到账延迟等问题说明",
      "觉醒之战即将再度开启！鬼谷子全屏大，露娜无限连",
      "新皮肤爆料丨AI意识觉醒，机器少女妲己绚丽登场！",
      "王者荣耀祝各位召唤师春节快乐！",
      "《王者荣耀》获App store推荐，带你领略五岳东方之美！",
      "五城战队团年饭，队友线下团聚回顾",
      "【已修复】关于部分召唤师点券充值未到账、点券到账延迟等问题说明",
      "【已修复】自定义赛事蓝方伤害数值异常问题说明",
      "“想玩英雄”三个都一样？违规，警告封号！",
      "2月4日全服不停机更新公告", "2月1日全服不停机更新公告"
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title,
      }
    })
    await Article.deleteMany({}) //清空原来的测试数据
    await Article.insertMany(newsList)
    res.send(newsList)
  })


  // 新闻数据接口
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name:'新闻资讯'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path:'newsList'
    //   }

    // }).lean()

    const parent = await Category.findOne({
        name:'新闻资讯'
      })
    //使用聚合查询
    const cats = await Category.aggregate([
      {
        $match: { parent: parent._id }
      },
      {
        $lookup: {
          from: 'articles',// 关联articles
          localField: '_id',
          foreignField: 'categories',// 外键
          as:'newsList'// 别名
        }
      },
      {
        $addFields: {
          newsList:{$slice:['$newsList',5]}
        }
      }
    ])

    //热门数据的处理
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories:{$in:subCats}
      }).populate('categories').limit(5).lean()
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = ( cat.name === '热门') ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)

  })
  app.use('/web/api', router)
}