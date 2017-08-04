import axios from 'axios'
import router from '@/router/'
import qs from 'qs'
const url = 'RootUrl'
import { Message } from 'element-ui'
const errorMsg = '服务器内部错误，有人要扣奖金了 ^_^'
const errorMsg401 = '登录超时，请重新登录'

axios.interceptors.request.use(config => {
  if (!!JSON.parse(sessionStorage.getItem('userinfo'))) {
    config.headers = Object.assign(config.headers, {
      "Authorization": JSON.parse(sessionStorage.getItem('userinfo')).token
    })
  }
  return config
})

const errorFn = err => {
  console.log(err.response.status)
  let status = err.response.status
  if ( status == 500 ){
     Message.error(errorMsg)
  }
  if (status == 401) {
    Message.error(errorMsg401)
    router.push('/')
  }
}

const post = (_url, obj, body) => axios.post(url + _url, body ? obj : qs.stringify(obj), {
  headers: {
    'Content-Type': body ? (body == true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded'
  }
}).then(d => {
  if (d.data.code == 401) {
    router.push('/')
  }
  return d
}).catch(errorFn)

const put = (_url, obj, body) => axios.put(url + _url, body ? obj : qs.stringify(obj), {
  headers: {
    'Content-Type': body ? (body == true ? 'application/json' : body.headers) : 'application/x-www-form-urlencoded'
  }
}).then(d => {
  if (d.data.code == 401) {
    router.push('/')
  }
  return d
}).catch(errorFn)

const get = (_url, obj) => axios.get(url + _url, {
  params: obj
}).then(d => {
  if (d.data.code == 401) {
    router.push('/')
  }
  return d
}).catch(errorFn)

const del = (_url, obj) => axios.delete(url + _url, {
  params: obj
}).then(d => {
  if (d.data.code == 401) {
    router.push('/')
  }
  return d
}).catch(errorFn)

export {
  post,
  put,
  get,
  del
}