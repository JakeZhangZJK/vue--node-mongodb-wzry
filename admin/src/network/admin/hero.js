import { GUID_req, upload } from '../request'

//新建
function createHero(data) {
  return GUID_req({
    url: '/heros',
    method: 'post',
    data
  })
}

//根据id查找(读取)
function getHero(heroId) {
  return GUID_req({
    url: `/heros/${heroId}`
  })
}

//编辑提交
function updateHero(heroId, data) {
  return GUID_req({
    url: `/heros/${heroId}`,
    method: 'put',
    data
  })
}

//删除
function deleteHero(heroId) {
  return GUID_req({
    url: `/heros/${heroId}`,
    method: 'delete'
  })
}

//获取列表
function getHeroList(params) {
  return GUID_req({
    url: '/heros',
    params
  })
}

export {
  createHero,
  getHero,
  updateHero,
  deleteHero,
  getHeroList
}