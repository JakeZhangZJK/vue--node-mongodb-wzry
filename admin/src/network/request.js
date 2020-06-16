import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'

import NProgress from 'nprogress'

//通用增删改查接口(增加rest字段)
function GUID_req(config) {

  const instance = axios.create({
    // baseURL: 'http://localhost:3333/admin/api/rest',
    baseURL: process.env.VUE_APP_API_URL_CRUD || '/admin/api/rest',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {

    NProgress.start()

    const token = sessionStorage.getItem('token')
    if (token) config.headers.Authorization = 'Bearer ' + token

    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {

    NProgress.done()

    return res
  }, err => {

    if (err.response.status === 401) {
      Vue.prototype.$message.error(err.response.data.message)
      router.push('/login')
    }
    if (err.response.status === 403) {
      Vue.prototype.$message.error(err.response.data.message)
    }

  })

  return instance(config)

}

//上传接口
function upload(config) {

  const instance = axios.create({
    // baseURL: 'http://localhost:3333/admin/api/upload',
    baseURL: process.env.VUE_APP_API_URL_UPLOAD || '/admin/api/upload',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if (token) config.headers.Authorization = 'Bearer ' + token
    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {
    return res
  }, err => {

    if (err.response.status === 401) {
      Vue.prototype.$message.error(err.response.data.message)
      router.push('/login')
    }
    if (err.response.status === 403) {
      Vue.prototype.$message.error(err.response.data.message)
    }

  })

  return instance(config)

}

//登录接口
function login(config) {

  const instance = axios.create({
    // baseURL: 'http://localhost:3333/admin/api',
    baseURL: process.env.VUE_APP_API_URL_LOGIN || '/admin/api',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {

    NProgress.start()

    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {

    NProgress.done()

    return res
  }, err => {

    if (err.response.status === 422) Vue.prototype.$message.error(err.response.data.message)

  })

  return instance(config)

}


export {
  GUID_req,
  upload,
  login
}