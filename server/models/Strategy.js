const mongoose = require('mongoose')

const strategySchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String },
  img: { type: String },
  play_volume: { type: String },
  time: { type: String },
  cate: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  heros: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }]
}, {
  timestamps: true
})

const Strategy = mongoose.model('Strategy', strategySchema)

module.exports = Strategy