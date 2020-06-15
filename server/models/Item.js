const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  star: { type: String, default: '' },
  desc: { type: String, default: '' },
  detail: { type: String, default: '' }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item