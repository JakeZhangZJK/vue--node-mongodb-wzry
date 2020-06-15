const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer')

app.set('secret', 'jakezhang168168')

//跨域
app.use(cors())
//将请求体转为json对象
app.use(express.json())
//托管静态资源
app.use('/wzry', express.static(__dirname + '/web'))
app.use('/wzry/back', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

//连接数据库
require('./plugins/db')(app)
//后台管理 GRUD 接口
require('./routes/admin/index')(app)
//图片上传接口
require('./routes/admin/imgUpload')(app, multer)
//登录接口
require('./routes/admin/login')(app)


//前端页面请求数据接口
// require('./routes/web/init')(app)// 快捷录入数据库数据，不要轻易操作
require('./routes/web/index')(app)
require('./routes/web/strategy')(app)
require('./routes/web/race')(app)
require('./routes/web/common')(app)

// 监听服务器其他错误
app.use((err, req, res, next) => {

  if (!err.statusCode) return res.status(500).send({ message: err.message })

  res.status(err.statusCode).send({
    message: err.message
  })

})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})