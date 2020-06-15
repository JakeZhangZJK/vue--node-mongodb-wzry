import { GUID_req, upload } from '../request'

//新建分类
function createArticle(data) {
  return GUID_req({
    url: '/articles',
    method: 'post',
    data
  })
}

//根据id查找分类(读取)
function getArticle(itemId) {
  return GUID_req({
    url: `/articles/${itemId}`
  })
}

//编辑提交分类
function updateArticle(itemId, data) {
  return GUID_req({
    url: `/articles/${itemId}`,
    method: 'put',
    data
  })
}

//删除分类
function deleteArticle(itemId) {
  return GUID_req({
    url: `/articles/${itemId}`,
    method: 'delete'
  })
}

//获取分类列表
function getArticleList(params) {
  return GUID_req({
    url: '/articles',
    params
  })
}

//图片上传
function articleImgUpload(data) {
  return upload({
    url: '/article',
    method: 'post',
    data
  })
}

export {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleList,
  articleImgUpload
}