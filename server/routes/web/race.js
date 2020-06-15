module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')

  app.use('/web/api/race', router)

  router.get('/information', async (req, res) => {

    if (req.query.id && req.query.pageNum) {

      const skipNum = 10 * (req.query.pageNum)
      const cate = await Category.findById(req.query.id)
      const data = await Article.find({ cate: { $elemMatch: { $eq: cate._id } } }).skip(skipNum).limit(10)
      res.send(data)

    } else {

      const parent = await Category.findOne({ name: "赛事中心" })
      const cetes = await Category.aggregate([
        { $match: { parent: parent._id } },
        {
          $lookup: {
            from: "articles",
            localField: "_id",
            foreignField: "cate",
            as: "information_list"
          }
        },
        {
          $addFields: {
            information_list: { $slice: ['$information_list', 10] }
          }
        }
      ])

      res.send(cetes)

    }

  })

}