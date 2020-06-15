module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const assert = require('http-assert')

  //登录验证中间件
  const auth = require('../../middlleware/validateMiddleWear')
  const access = require('../../middlleware/access')

  // 监听所有通用接口-----------------------------------------------------------
  app.use('/admin/api/rest/:resource', auth(app), async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  //创建
  router.post('/', access(app), async (req, res) => {
    try {
      const model = await req.Model.create(req.body)
      res.send(model)
    } catch (error) {
      res.status(400).send({ message: '传入的参数有误' })
    }

  })


  //获取列表
  router.get('/', async (req, res, next) => {

    // if (Object.keys(req.query).length === 0) return next()
    if (!(req.query.pagenum || req.query.pagesize)) return next()
    const pagenum = Number(req.query.pagenum)
    const pagesize = Number(req.query.pagesize)
    const skipNum = (pagenum - 1) * pagesize
    const total = await req.Model.countDocuments()
    let data
    if (req.query.query) {
      data = await req.Model.find({ name: req.query.query }).skip(skipNum).limit(pagesize).populate('cate')
    } else {
      data = await req.Model.find().skip(skipNum).limit(pagesize).populate('cate')
    }
    res.send({
      total,
      data
    })

  }, async (req, res) => {

    if (req.Model.modelName === 'Category') {
      const parents = await req.Model.find().where({
        parent: null
      }).lean()

      // const tree = async parents => {
      //   return await parents.map(async item => {
      //     const children = await req.Model.aggregate([
      //       { $match: { parent: item._id } },
      //       {
      //         $lookup: {
      //           from: 'Category',
      //           localField: '_id',
      //           foreignField: 'parent',
      //           as: 'children'
      //         }
      //       }
      //     ])

      //     if(children.length < 1) return item

      //     item.children = children
      //     tree(item.children)

      //     return item

      //   })

      // }
      // const data = await Promise.all(tree(parents))

      // return res.send(data)

      for (let i = 0; i < parents.length; i++) {

        parents[i].children = await req.Model.aggregate([
          { $match: { parent: parents[i]._id } },
          {
            $lookup: {
              from: 'Category',
              localField: '_id',
              foreignField: 'parent',
              as: 'children'
            }
          }
        ])

        const lenth = parents[i].children.length

        for (let j = 0; j < lenth; j++) {
          // console.log((parents[i].children)[j]);

          (parents[i].children)[j].children = await req.Model.aggregate([
            { $match: { parent: (parents[i].children)[j]._id } },
            {
              $lookup: {
                from: 'Category',
                localField: '_id',
                foreignField: 'parent',
                as: 'children'
              }
            }
          ])
        }

      }

      return res.send(parents)

    }

    const queryOptions = {}
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'cate'
    }

    if (req.Model.modelName === 'Hero') {
      if (req.query.query) {
        const model = await Hero.find({ name: req.query.query })
        res.send(model)
      } else {
        const model = await req.Model.find().setOptions(queryOptions)
        return res.send(model)
      }
    }
    const model = await req.Model.find().setOptions(queryOptions)
    res.send(model)

  })

  // 通过id查找
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //编辑提交
  router.put('/:id', access(app), async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //根据id删除
  router.delete('/:id', access(app), async (req, res) => {
    // 禁止删除有子分类的父级分类
    if (req.Model.modelName === 'Category') {

      const parent = await req.Model.findById(req.params.id)

      const children = await req.Model.aggregate([
        { $match: { parent: parent._id } },
        {
          $lookup: {
            from: 'Category',
            localField: '_id',
            foreignField: 'cate',
            as: 'children'
          }
        }
      ])

      assert(children.length < 1, 403, '无法删除')
    }

    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ message: '删除成功' })
  })
}