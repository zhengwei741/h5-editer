import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface globalProps {
  requestNumber: number
  opNames: { [key: string]: boolean }
}

const global: Module<globalProps, GlobalDataProps> = {
  state: {
    requestNumber: 0,
    opNames: {},
  },
  mutations: {
    startLoading(state, opName: string) {
      state.requestNumber++
      if (opName) {
        state.opNames[opName] = true
      }
    },
    finishLoading(state, opName: string) {
      state.requestNumber--
      if (opName) {
        delete state.opNames[opName]
      }
    },
  },
  getters: {
    isLoading: (state) => state.requestNumber > 0,
    isOpLoading: (state) => {
      return (opName: string) => state.opNames[opName]
    },
  },
}

export default global
