import { GUID_req, upload } from '../request'

//新建分类
function createItem(data) {
  return GUID_req({
    url: '/items',
    method: 'post',
    data
  })
}

//根据id查找分类(读取)
function getItem(itemId) {
  return GUID_req({
    url: `/items/${itemId}`
  })
}

//编辑提交分类
function updateItem(itemId, data) {
  return GUID_req({
    url: `/items/${itemId}`,
    method: 'put',
    data
  })
}

//删除分类
function deleteItem(itemId) {
  return GUID_req({
    url: `/items/${itemId}`,
    method: 'delete'
  })
}

//获取分类列表
function getItemList(params) {
  return GUID_req({
    url: '/items',
    params
  })
}
export {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  getItemList
}