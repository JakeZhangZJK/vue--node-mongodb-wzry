const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
    default: null
  },
  desc: { type: String }
})

categorySchema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category