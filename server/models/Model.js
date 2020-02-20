const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Model' },
})
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref:'Model'
})


module.exports = mongoose.model('Model', schema)