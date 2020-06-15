module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Ad = mongoose.model('Ad')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')
  // const Item = mongoose.model('Item')
  const Strategy = mongoose.model('Strategy')

  app.use('/web/api/home', router)

  //轮播图接口
  router.get('/ads', async (req, res) => {
    const model = await Ad.find()
    res.send(model)
  })

  //新闻数据接口
  router.get('/news', async (req, res) => {

    //普通populate查询>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // const parent = await Category.findOne({
    //   name: '新闻资讯'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'news_list'
    //   }
    // }).lean()

    //聚合查询>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const parent = await Category.findOne({ name: '新闻资讯' })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'cate',
          as: 'news_list'
        }
      },
      {
        $addFields: {
          news_list: { $slice: ['$news_list', 5] }
        }
      }
    ])
    subCates = cats.map(item => {
      return item._id
    })
    // 在最前面插入热门分类
    cats.unshift({
      name: '热门',
      news_list: await Article.find().populate('cate').where({
        cate: { $in: subCates }
      }).limit(5).lean()
    })
    //判断分类是否为热门，如果为热门，则直接取该分类名
    cats.map(cat => {
      cat.news_list.map(news => {
        news.cate_name = cat.name === '热门' ? news.cate[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  // 英雄列表数据请求接口
  router.get('/heros', async (req, res) => {
    // const cates = await Category.findOne({
    //   name: '英雄列表'
    // }).populate({
    //   path: 'children'
    // }).lean()

    const parent = await Category.findOne({ name: '英雄列表' })
    const cates = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heros',
          localField: '_id',
          foreignField: 'cate',
          as: 'hero_list'
        }
      }
    ])
    // const subCates = cates.map(cate => cate._id)
    // cates.unshift({
    //   name: '热门',
    //   hero_list: await Hero.find().where({
    //     cate: { $in: subCates }
    //   }).limit(10).lean()
    // })
    res.send(cates)
  })

  //根据id获取文章详情
  router.get('/article/:id', async (req, res) => {
    const model = await Article.findById(req.params.id).lean()
    model.related = await Article.find().where({
      cate: { $in: model.cate }
    }).skip(1).limit(2)
    res.send(model)
  })

  // 根据id获取单个英雄数据
  router.get('/hero/:id', async (req, res) => {
    res.send(await Hero.findById(req.params.id).populate('cate downWind.equipment upWind.equipment partners.hero restrained.hero restraint.hero'))
  })

  // 获取精彩视频数据接口
  router.get('/videos', async (req, res) => {
    // 获取赛事视频数据
    // const data = [{ "title": "王者荣耀世冠：远游之枪华丽收割，花满楼世冠马可波罗击杀集锦", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550567&e_code=pvpweb_m.statictypenew.type751", "img": "https://puui.qpic.cn/qqvideo_ori/0/z092122i7uv_1280_720/0", "play_volume": "4.6万" }, { "title": "Djie一闪侧翼进场，梦奇小爪子疯狂乱舞！", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550792&e_code=pvpweb_m.statictypenew.type751", "img": "https://puui.qpic.cn/qqvideo_ori/0/g0921jhs0ha_1280_720/0", "play_volume": "3.1万" }, { "title": "花海云中君暴走时刻，这波三杀真的帅气！", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550566&e_code=pvpweb_m.statictypenew.type751", "img": "https://puui.qpic.cn/qqvideo_ori/0/r09212zlrm4_1280_720/0", "play_volume": "2.3万" }, { "title": "世冠雨雨关羽集锦：这就是实力！千万雄兵莫敢当，单刀匹马斩四方", "url": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550251&e_code=pvpweb_m.statictypenew.type751", "img": "https://puui.qpic.cn/qqvideo_ori/0/b0921yawkou_1280_720/0", "play_volume": "3.2万" }]

    // 赛事视频数据
    const raceVideoData = await Strategy.find({ type: 'race' }).limit(4)

    // 获取精品栏目和赛事精品数据
    const newestParent = await Category.find({
      name: { $in: ['精品栏目', '赛事精品'] }
    })

    const newest = await Category.find({
      name: '最新',
      parent: { $in: newestParent.map(item => item._id) }
    })

    // 精品栏目数据
    const BoutiqueSectionData = await Strategy.find({ cate: { $elemMatch: { $eq: newest[0]._id } } }).limit(4)
    // 赛事精品数据
    const raceBoutique = await Strategy.find({ cate: { $elemMatch: { $eq: newest[1]._id } } }).limit(4)

    // 获取英雄攻略数据
    // const hotParent = await Category.find({ name: '英雄列表' })
    // const hot = await Category.find().where({
    //   name: '热门',
    //   parent: hotParent[0]._id
    // })
    // const hotHero = await Hero.find({ cate: { $elemMatch: { $eq: hot[0]._id } } })
    const hotHero = await Hero.find({ name: '后羿' })

    // 英雄攻略数据
    const heroStrategy = await Strategy.find({ heros: { $elemMatch: { $eq: hotHero[0]._id } } }).limit(4)

    const finalData = [[...BoutiqueSectionData], [...heroStrategy], [...raceBoutique], [...raceVideoData]]
    const wonderfulVideoData = ['精品栏目', '英雄攻略', '赛事精品', '赛事视频'].map((item, i) => {
      return {
        name: item,
        videos: finalData[i]
      }
    })

    res.send(wonderfulVideoData)
  })

  // 获取图文攻略数据接口
  router.get('/graphics', async (req, res) => {

    // console.log(req.query);

    if (req.query.id && req.query.pageNum) {

      const skipNum = 8 * (req.query.pageNum)
      const cate = await Category.findById(req.query.id)
      const data = await Strategy.find({ cate: { $elemMatch: { $eq: cate._id } } }).skip(skipNum).limit(8)
      res.send(data)

    } else {

      const parentCate = await Category.findOne({ name: '图文攻略' })

      const data = await Category.aggregate([
        { $match: { parent: parentCate._id } },
        {
          $lookup: {
            from: 'strategies',
            localField: '_id',
            foreignField: 'cate',
            as: 'graphic_list'
          }
        },
        {
          $addFields: {
            graphic_list: { $slice: ['$graphic_list', 8] }
          }
        }
      ])
      res.send(data)
    }

  })

}