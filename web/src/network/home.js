import { request } from './request'

function getAds() {
  return request({
    url: '/home/ads'
  })
}

function getNews() {
  return request({
    url: '/home/news'
  })
}

function getHeros() {
  return request({
    url: '/home//heros'
  })
}

function getVideos() {
  return request({
    url: '/home//videos'
  })
}

function getGraphics(params) {
  return request({
    url: '/home//graphics',
    params
  })
}

//根据id查询文章
function getArticleById(id) {
  return request({
    url: `/home//article/${id}`
  })
}

function getHeroById(id) {
  return request({
    url: `/home//hero/${id}`
  })
}

export {
  getAds,
  getNews,
  getHeros,
  getVideos,
  getGraphics,
  getArticleById,
  getHeroById
}