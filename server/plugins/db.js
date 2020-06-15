module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/irectoryperdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => {
    console.log('数据库连接成功')
  }).catch(err => {
    console.log('数据库连接失败')
  })
  require('require-all')(__dirname + '/../models')
}