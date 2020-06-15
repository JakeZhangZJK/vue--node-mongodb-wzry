module.exports = (app) => {
  return async (req, res, next) => {
    const assert = require('http-assert')
    assert(req.headers.authorization, 401, '请先登录')

    const token = req.headers.authorization.split(' ').pop()
    assert(token, 401, '请提供jwt token')

    const { id } = require('jsonwebtoken').verify(token, app.get('secret'))
    assert(id, 401, '无效的jwt token')

    req.user = await require('../models/AdminUser').findById(id)

    assert(req.user, 401, '用户不存在')

    next()

  }
}