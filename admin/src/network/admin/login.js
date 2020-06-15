import { login } from '../request'

export function loginReq(data) {
  return login({
    url: '/login',
    method: 'post',
    data
  })
}