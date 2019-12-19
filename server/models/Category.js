const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    }
});

// 导出模板
module.exports = mongoose.model('Category',schema)