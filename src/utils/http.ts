import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { RespData } from '@/shared/responseType'
import store from '@/store'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
})

// Add a request interceptor
http.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.authorization = `Bearer ${sessionStorage.getItem(
      '_userToken_'
    )}`
    store.commit('startLoading', config.url)
    return config
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function (response: AxiosResponse<RespData<any>>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.commit('finishLoading', response.config.url)
    const { errno, message: msg } = response.data
    if (errno !== 0) {
      message.error(msg || '')
      return Promise.reject(msg)
    }
    return response.data
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

interface vAxios {
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  get<T = any>(url: string, data?: any): Promise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  delete<T = any>(url: string, data?: any): Promise<T>
}

export const defHttp: vAxios = {
  post(url, data, config) {
    return http.post(url, data, config)
  },
  get(url, data) {
    return http.get(url, data)
  },
  put(url, data, config) {
    return http.put(url, data, config)
  },
  delete(url, data) {
    return http.delete(url, data)
  },
}

export default http
