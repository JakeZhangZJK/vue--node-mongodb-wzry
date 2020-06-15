import { GUID_req } from '../request'

//新建分类
function createCate(data) {
  return GUID_req({
    url: '/categories',
    method: 'post',
    data
  })
}

//根据id查找分类(读取)
function getCate(cateId) {
  return GUID_req({
    url: `/categories/${cateId}`
  })
}

//编辑提交分类
function updateCate(cateId, data) {
  return GUID_req({
    url: `/categories/${cateId}`,
    method: 'put',
    data
  })
}

//删除分类
function deleteCate(cateId) {
  return GUID_req({
    url: `/categories/${cateId}`,
    method: 'delete'
  })
}

//获取分类列表
function getCateList() {
  return GUID_req({
    url: '/categories'
  })
}

export {
  createCate,
  getCate,
  updateCate,
  deleteCate,
  getCateList
}