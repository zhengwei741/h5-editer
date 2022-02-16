import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { responseType } from '@/shared/responseType'

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
    return config
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function (response: AxiosResponse<responseType<any>>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { errorno, rspMsg } = response.data
    if (errorno !== 0) {
      message.error(rspMsg)
      return Promise.reject(rspMsg)
    }
    return response.data
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default http
