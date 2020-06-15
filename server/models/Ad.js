const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
  name: { type: String },
  items: [{
    img: { type: String },
    url: { type: String }
  }]
})

const Ad = mongoose.model('Ad', adSchema)

module.exports = Ad