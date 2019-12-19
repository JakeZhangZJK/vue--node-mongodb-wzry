module.exports = app => { 
    const express = require("express")
    const router = express.Router()
    // 引入模板
    const Category = require('../../models/Category')

    router.post('/categories', async (req, res) => { 
        const model = await Category.create(req.body)
        res.send(model)// 将模板发送出去（客户端）

    });
    
    app.use('/admin/api',router)
}