module.exports = (app) => {
  return async (req, res, next) => {
    const assert = require('http-assert')

    assert(req.user.level <= 1, 403, "您的权限不够")

    next()

  }
}