import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios'
import { message } from 'ant-design-vue'
import { RespData } from '@/shared/responseType'
import store from '@/store'

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
}

export type RequestMethods =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'option'
  | 'head'

class vAxios {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  private static instance: AxiosInstance = axios.create(defaultConfig)
  httpInterceptorsRequest() {
    const instance = vAxios.instance
    instance.interceptors.request.use(
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
  }
  httpInterceptorsResponse() {
    const instance = vAxios.instance
    // Add a response interceptor
    instance.interceptors.response.use(
      function (response: AxiosResponse<RespData<any>>) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        store.commit('finishLoading', response.config.url)
        const { errno, message: msg } = response.data
        if (errno !== 0) {
          const _msg = msg || '未知错误'
          message.error(_msg)
          return Promise.reject(_msg)
        }
        return response.data
      },
      function (error: any) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
  request<T>(
    method: RequestMethods,
    url: string,
    data: any = {},
    param: AxiosRequestConfig = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const config = {
        url,
        method,
        data,
        ...param,
      } as AxiosRequestConfig
      const instance = vAxios.instance
      instance
        .request(config)
        .then((res: any) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>('post', url, data, config)
  }
  get<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>('get', url, data, config)
  }
}

export default new vAxios()
