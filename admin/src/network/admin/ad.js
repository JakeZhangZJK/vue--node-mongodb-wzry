import { GUID_req, upload } from '../request'

//新建分类
function createAd(data) {
  return GUID_req({
    url: '/ads',
    method: 'post',
    data
  })
}

//根据id查找分类(读取)
function getAd(itemId) {
  return GUID_req({
    url: `/ads/${itemId}`
  })
}

//编辑提交分类
function updateAd(itemId, data) {
  return GUID_req({
    url: `/ads/${itemId}`,
    method: 'put',
    data
  })
}

//删除分类
function deleteAd(itemId) {
  return GUID_req({
    url: `/ads/${itemId}`,
    method: 'delete'
  })
}

//获取分类列表
function getAdList() {
  return GUID_req({
    url: '/ads'
  })
}

export {
  createAd,
  getAd,
  updateAd,
  deleteAd,
  getAdList
}