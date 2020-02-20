// 视频模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: { type: String },// 标题
  image: { type: String },//封面图
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],// 所属分类
  video: { type: String },// 视频
  submit: { type: String },// 投稿次数
  fan: { type: String },// 粉丝
  see:{type:String},// 观看次数

}, {
  timestamps:true// 创建时间
})
module.exports = mongoose.model('Video',schema)