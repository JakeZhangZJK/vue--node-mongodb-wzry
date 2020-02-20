const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],// 所属分类
  body: {type: String}
}, {
  timestamps:true
})

module.exports = mongoose.model('Article', schema)