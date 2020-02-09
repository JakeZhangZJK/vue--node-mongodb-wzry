module.exports = app => { 
    const mongoose = require("mongoose")
    
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/vue-node-wzry',
        {
            useNewUrlParser:true
        }
  )
  //引用models中所有的文件（需要安装‘require-all’插件）
  require('require-all')(__dirname + '/../models')
}