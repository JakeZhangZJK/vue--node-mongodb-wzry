// 图文攻略模型
const mongoose = require('mongoose')
const schema = mongoose.Schema({
  title: { type: String },// 标题
  image:{type: String },// 封面图
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],// 所属分类
  body: {type: String}// 攻略详情
  
}, {
  timestamps:true// 创建时间
})
module.exports = mongoose.model('Guide',schema)