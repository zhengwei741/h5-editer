import http from '@/utils/http'
import { AxiosRequestConfig } from 'axios'
import { UserInfo } from '@/store/user'

export const login = (userName = '', passWord = '') => {
  return http.post<AxiosRequestConfig<UserInfo>>('/user/login', {
    userName,
    passWord,
  })
}

export const fetchCurrentUser = (token = '') => {
  return http.post<AxiosRequestConfig<UserInfo>>('/user/fetchCurrentUser', {
    token,
  })
}
