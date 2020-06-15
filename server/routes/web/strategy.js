module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Ad = mongoose.model('Ad')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')
  const Strategy = mongoose.model('Strategy')

  app.use('/web/api/strategy', router)

  // 轮播图接口
  router.get('/ads', async (req, res) => {
    const model = await Ad.find()
    res.send(model)
  })

  // 热门视频接口
  router.get('/hotvideos', async (req, res) => {

    const data_1 = await Strategy.find().collation({ "locale": "zh", numericOrdering: true }).sort({ play_volume: -1 }).skip(500).limit(10)
    const data_2 = await Strategy.find().collation({ "locale": "zh", numericOrdering: true }).sort({ play_volume: -1 }).skip(300).limit(10)
    const data_3 = await Strategy.find().collation({ "locale": "zh", numericOrdering: true }).sort({ play_volume: -1 }).skip(100).limit(10)
    const data = [[...data_1], [...data_2], [...data_3]]
    const _data = ['日', '周', '月'].map((item, i) => {
      return {
        name: item,
        data: data[i]
      }
    })
    res.send(_data)
  })

  router.get('/heros', async (req, res) => {
    const data = []
    const heros = await Hero.find({ name: { $in: ['后羿', '孙悟空', '铠', '孙尚香', '孙膑', '镜'] } })
    heros.forEach(hero => {
      if (hero.name === '后羿') data[0] = hero
      if (hero.name === '孙悟空') data[1] = hero
      if (hero.name === '铠') data[2] = hero
      if (hero.name === '孙尚香') data[3] = hero
      if (hero.name === '孙膑') data[4] = hero
      if (hero.name === '镜') data[5] = hero
    })
    res.send(data)
  })

  // 英雄攻略接口
  router.get('/hero_strategies/:id', async (req, res) => {
    const hero = await Hero.findById(req.params.id).populate('cate').lean()

    const videos = await Strategy.find({
      heros: { $elemMatch: { $eq: hero._id } },
      play_volume: { $exists: true }
    }).limit(2)

    const graphics = await Strategy.find({
      heros: { $elemMatch: { $eq: hero._id } },
      play_volume: undefined,
      time: undefined
    }).limit(2)

    hero.appearance_rank = 1
    hero.win_rate_rank = 2
    hero.videos = videos
    hero.graphics = graphics

    res.send(hero)
  })

  // 精品栏目接口
  router.get('/boutique_section', async (req, res) => {
    const cate = await Category.findOne({ name: '精品栏目' })
    const data = await Category.aggregate([
      { $match: { parent: cate._id } },
      {
        $lookup: {
          from: 'strategies',
          localField: '_id',
          foreignField: 'cate',
          as: 'video_list'
        }
      },
      {
        $addFields: {
          video_list: { $slice: ['$video_list', 4] }
        }
      }
    ])
    res.send(data)
  })

  // 赛事精品接口
  router.get('/race_outique', async (req, res) => {
    const cate = await Category.findOne({ name: '赛事精品' })
    const data = await Category.aggregate([
      { $match: { parent: cate._id } },
      {
        $lookup: {
          from: 'strategies',
          localField: '_id',
          foreignField: 'cate',
          as: 'video_list'
        }
      },
      {
        $addFields: {
          video_list: { $slice: ['$video_list', 4] }
        }
      }
    ])
    res.send(data)
  })

  // 精彩视频接口
  router.get('/videos', async (req, res) => {
    const cate = await Category.findOne({ name: '精彩视频' })
    const data = await Category.aggregate([
      { $match: { parent: cate._id } },
      {
        $lookup: {
          from: 'strategies',
          localField: '_id',
          foreignField: 'cate',
          as: 'video_list'
        }
      },
      {
        $addFields: {
          video_list: { $slice: ['$video_list', 4] }
        }
      }
    ])
    res.send(data)
  })

  // 图文攻略接口
  router.get('/graphics', async (req, res) => {

    if (req.query.id && req.query.pageNum) {

      const skipNum = 4 * (req.query.pageNum)
      const cate = await Category.findById(req.query.id)
      const data = await Strategy.find({ cate: { $elemMatch: { $eq: cate._id } } }).skip(skipNum).limit(4)
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
            graphic_list: { $slice: ['$graphic_list', 4] }
          }
        }
      ])
      res.send(data)
    }

  })

  // 更多
  router.get('/more', async (req, res) => {
    const parentCate = await Category.findOne({ name: "攻略中心" })

    const cates = await Category.aggregate([{ $match: { parent: parentCate._id } }])


    const heros = []
    const _heros = await Hero.find({ name: { $in: ['后羿', '孙悟空', '铠', '孙尚香', '孙膑', '镜'] } })
    _heros.forEach(hero => {
      if (hero.name === '后羿') heros[0] = hero
      if (hero.name === '孙悟空') heros[1] = hero
      if (hero.name === '铠') heros[2] = hero
      if (hero.name === '孙尚香') heros[3] = hero
      if (hero.name === '孙膑') heros[4] = hero
      if (hero.name === '镜') heros[5] = hero
    })


    for (cate of cates) {
      const _data = await Category.aggregate([
        { $match: { parent: cate._id } },
        {
          $lookup: {
            from: "strategies",
            localField: "_id",
            foreignField: "cate",
            as: "strategy_list"
          }
        },
        {
          $addFields: {
            strategy_list: { $slice: ['$strategy_list', 10] }
          }
        }
      ])
      cate.children = _data
    }

    cates.unshift({
      id: "001",
      name: "英雄攻略",
      heros
    })

    res.send(cates)

  })

}