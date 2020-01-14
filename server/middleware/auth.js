module.exports = () => {
    const jwt = require('jsonwebtoken')
    // const assert = require('http-assert') //error提示包
    const AdminUser = require('../models/AdminUser')


    return async (req, res, next) => { // 登录校验中间件
        const token = String(req.headers.authorization || ' ').split(' ').pop();
        // assert(token,401,'请先登录！')
        if (!token) {
            return res.status(401).send({
                message: '请先登录！'
            })
        }
        const {
            id
        } = jwt.verify(token, req.app.get('secret')) // 通过jwt解密token，提取token数据
        //assert(id,401,'请先登录！')
        if (!id) {
            return res.status(401).send({
                message: '请先登录！'
            })
        }
        req.user = await AdminUser.findById(id); //通过id查找AdminUser模型里面是否存在该用户，防止伪造
        //assert(req.user,401,'请先登录！')
        if (!req.user) {
            return res.status(401).send({
                message: '请先登录！'
            })
        }
        await next();
    }
}