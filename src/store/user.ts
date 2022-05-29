import { Module } from 'vuex'
import { GlobalDataProps } from './index'

import { login, fetchCurrentUser } from '@/api/user'

export interface UserProps {
  isLogin: boolean
  userInfo: UserInfo | null | undefined
  token: string | null
}

export interface UserInfo {
  userName?: string
  token?: string
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    // 用户信息
    isLogin: false,
    userInfo: null,
    token: sessionStorage.getItem('_userToken_'),
  },
  mutations: {
    loginOut(state) {
      state.isLogin = false
      state.token = null
      sessionStorage.removeItem('_userToken_')
    },
    login(state, userInfo: UserInfo) {
      state.isLogin = true
      state.userInfo = userInfo
    },
    updateToken(state, token) {
      state.token = token
      sessionStorage.setItem('_userToken_', token)
    },
  },
  actions: {
    login({ commit }, { userName, passWord }) {
      return login(userName, passWord).then((res) => {
        commit('login', { userName })
        commit('updateToken', res.data?.token)
      })
    },
    fetchCurrentUser({ commit }, token: string) {
      return fetchCurrentUser(token).then((res) => {
        commit('login', res.data)
        return res.data
      })
    },
  },
}

export default user
