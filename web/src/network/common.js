import { request } from './request'

function getHeroList() {
  return request({
    url: '/heros'
  })
}

export {
  getHeroList
}