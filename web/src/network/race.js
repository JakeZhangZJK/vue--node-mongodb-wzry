import { request } from './request'

function getInformation(params) {
  return request({
    url: '/race/information',
    params
  })
}

export {
  getInformation
}