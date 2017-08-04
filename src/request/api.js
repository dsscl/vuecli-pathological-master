import axios from 'axios'
import router from '@/router/'
const url = 'RootUrl'
axios.interceptors.request.use(config => {
  if (!!JSON.parse(sessionStorage.getItem('userinfo'))) {
    config.headers.Authorization = JSON.parse(sessionStorage.getItem('userinfo')).token
  }
  return config
})
const post = (_url, obj) => axios.post(url + _url, obj).then(d => d).catch(err => {
  console.log(err.response.status)
  router.push('/')
})
const get = (_url, obj) => axios.get(url + _url, {
  params: obj
}).then(d => d).catch(err => {
  console.log(err.response.status)
  router.push('/')
})
export {
  post,
  get
}