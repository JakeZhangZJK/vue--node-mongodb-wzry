import { request } from './request'

function getAds() {
  return request({
    url: '/strategy/ads'
  })
}

function getHotvideos() {
  return request({
    url: '/strategy/hotvideos'
  })
}

function getBoutiqueSection() {
  return request({
    url: '/strategy/boutique_section'
  })
}

function getStrategyHeros() {
  return request({
    url: '/strategy/heros'
  })
}

function getHeroStrategies(id) {
  return request({
    url: `/strategy/hero_strategies/${id}`
  })
}

function getRaceOutique() {
  return request({
    url: '/strategy/race_outique'
  })
}

function getVideos() {
  return request({
    url: '/strategy/videos'
  })
}

function getGraphics(params) {
  return request({
    url: '/strategy/graphics',
    params
  })
}

function getMore(params) {
  return request({
    url: '/strategy/more',
    params
  })
}

export {
  getAds,
  getHotvideos,
  getBoutiqueSection,
  getStrategyHeros,
  getHeroStrategies,
  getRaceOutique,
  getVideos,
  getGraphics,
  getMore
}