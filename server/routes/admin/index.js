module.exports = app => {
  const express = require("express")
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true // 合并url参数
  })

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


  // 登录校验中间件
  const authMiddleWare = require('../../middleware/auth.js')
  // 资源匹配中间件
  const resourceMiddleWare = require('../../middleware/resource.js')

  // 资源路由
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)



  // 图片上传接口
  const multer = require('multer') // 导入上传文件中间件的依赖包，需要先安装
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  // 上传中间件
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body;
    // 1.根据用户名找用户

    const user = await AdminUser.findOne({
      username
    }).select('+password')
    // assert(user, 422, {
    //   message: '用户不存在！'
    // })
    if (!user) {
      return res.status(422).send({
        message: '用户不存在！'
      })
    }
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    // assert(isValid, 422, { message:'密码错误！'})
    if (!isValid || isValid == '') {
      return res.status(422).send({
        message: '密码错误！'
      })
    }


    // 3.返回token

    const token = jwt.sign({
      id: user._id
    }, app.get('secret'), {
      expiresIn: '24h'
    }) // 通过调用 sign 方法, 把 **用户信息**、**密钥** 生成token，并设置过期时间 
    res.send({
      user,
      token
    })
  })
  //错处统一处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}