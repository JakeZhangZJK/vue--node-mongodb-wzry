import { GUID_req } from '../request'

//新建用户
function createAdminUser(data) {
  return GUID_req({
    url: '/admin_users',
    method: 'post',
    data
  })
}

//根据id查找用户(读取)
function getAdminUser(itemId) {
  return GUID_req({
    url: `/admin_users/${itemId}`
  })
}

//编辑提交用户
function updateAdminUser(itemId, data) {
  return GUID_req({
    url: `/admin_users/${itemId}`,
    method: 'put',
    data
  })
}

//删除用户
function deleteAdminUser(itemId) {
  return GUID_req({
    url: `/admin_users/${itemId}`,
    method: 'delete'
  })
}

//获取用户列表
function getAdminUserList() {
  return GUID_req({
    url: '/admin_users'
  })
}

export {
  createAdminUser,
  getAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAdminUserList
}