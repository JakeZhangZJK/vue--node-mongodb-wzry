module.exports = () => { 
    return async (req, res, next) => { // 模型匹配中间件  // “resource”为动态参数，用来匹配相应资源
        const modelName = require('inflection').classify(req.params.resource) // 请求动态资源  这里需要安装一个inflection依赖包，用于类名转换
        req.Model = require(`../models/${modelName}`)
        next()
      }
}