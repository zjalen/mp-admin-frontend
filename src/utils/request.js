import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: 'mp-admin', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // store.commit('setLoading', true)
    if (store.getters.mp_sign) {
      config.headers['Mp-Sign'] = store.getters.mp_sign
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // store.commit('setLoading', false)
    return res;
  },
  error => {
    let message = Object.prototype.hasOwnProperty.call(error.response.data, 'error_message')
                ? error.response.data.error_message
                : error.response.statusText
    if(error.response.status === 422){
        let errors = Object.values(error.response.data.errors)[0];
        message = errors[0]
    }else if(error.response.status === 401) {
        message = '登录失效，请重新登录';
    }
    store.commit('setSnackbar', {
        message: message,
        color: 'error',
        timeout: 5000,
        show: true
    })
//     console.log('err' + error) // for debug
    // store.commit('setLoading', false)
    return Promise.reject(error)
  }
)

export default service
