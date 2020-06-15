const mongoose = require('mongoose')

const adminUserSchema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  },
  level: { type: String }
})

const AdminUser = mongoose.model('AdminUser', adminUserSchema)

module.exports = AdminUser