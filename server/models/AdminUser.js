const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select:false,
    set(val) { 
      return require('bcryptjs').hashSync(val,10)// 散列加密密码  需要安装 bcryptjs模块（cnpm i bcryptjs --save）
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)