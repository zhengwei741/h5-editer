import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface UserProps {
  isLogin: boolean
  userName?: string
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    // 用户信息
    isLogin: false,
  },
  mutations: {
    loginOut(state) {
      state.isLogin = false
      state.userName = ''
    },
    login(state, userInfo = {}) {
      state.isLogin = true
      state.userName = userInfo.userName
    },
  },
  actions: {
    loginOut({ commit }) {
      commit('loginOut')
    },
    login({ commit }) {
      commit('login', { userName: 'test' })
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('登录成功')
        }, 1000)
      })
    },
  },
}

export default user
