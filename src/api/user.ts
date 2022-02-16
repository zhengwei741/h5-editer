import http from '@/utils/http'

export const login = (userName = '', passWord = '') => {
  return http.post('/user/login', {
    userName,
    passWord,
  })
}

export const fetchCurrentUser = (token = '') => {
  return http.post('/user/fetchCurrentUser', {
    token,
  })
}
