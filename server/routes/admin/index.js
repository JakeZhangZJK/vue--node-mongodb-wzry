module.exports = app => { 
    const express = require("express")
    const router = express.Router()
    // 引入模板
    const Category = require('../../models/Category')

    // 新建分类
    router.post('/categories', async (req, res) => { 
        const model = await Category.create(req.body)
        res.send(model)// 将模板发送出去（客户端）

    });


    // 获取分类列表
    router.get('/categories', async (req, res) => { 
        const items = await Category.find().limit(10) //  限制一个页面放10条数据
        res.send(items)// 将模板发送出去（客户端）

    });
    
    app.use('/admin/api',router)
}